const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Test endpoint to check Supabase connection
app.get('/api/test', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('count');
    res.json({ 
      message: 'Supabase connection successful',
      data,
      error
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email,
          password: hashedPassword,
          name
        }
      ])
      .select('id, email, name')
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return res.status(500).json({ error: 'Error creating user' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: newUser.id, email: newUser.email, name: newUser.name }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Product Routes
app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const { name, category, price, stock_quantity, description } = req.body;
    
    if (!name || !category || !price || stock_quantity === undefined) {
      return res.status(400).json({ error: 'Name, category, price, and stock quantity are required' });
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          category,
          price: parseFloat(price),
          stock_quantity: parseInt(stock_quantity),
          description,
          user_id: req.user.userId
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Create product error:', error);
      return res.status(500).json({ error: 'Error creating product: ' + error.message });
    }

    res.status(201).json({ 
      message: 'Product created successfully', 
      product 
    });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/products', authenticateToken, async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', req.user.userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get products error:', error);
      return res.status(500).json({ error: 'Error fetching products' });
    }

    res.json({ products: products || [] });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, stock_quantity, description } = req.body;

    if (!name || !category || !price || stock_quantity === undefined) {
      return res.status(400).json({ error: 'Name, category, price, and stock quantity are required' });
    }

    const { data: product, error } = await supabase
      .from('products')
      .update({
        name,
        category,
        price: parseFloat(price),
        stock_quantity: parseInt(stock_quantity),
        description,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', req.user.userId)
      .select()
      .single();

    if (error) {
      console.error('Update product error:', error);
      return res.status(500).json({ error: 'Error updating product' });
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ 
      message: 'Product updated successfully', 
      product 
    });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.userId)
      .select()
      .single();

    if (error) {
      console.error('Delete product error:', error);
      return res.status(500).json({ error: 'Error deleting product' });
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
});