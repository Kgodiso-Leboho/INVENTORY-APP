// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import StatsCard from '../components/StatsCard';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowTable(true); // Automatically show table when searching
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const loadProducts = async () => {
    try {
      const response = await productService.getProducts();
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      await productService.createProduct(productData);
      await loadProducts();
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      await productService.updateProduct(editingProduct.id, productData);
      await loadProducts();
      setEditingProduct(null);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productService.deleteProduct(productId);
      await loadProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowTable(false);
  };

  const handleShowAll = () => {
    setShowTable(true);
    setSearchTerm('');
  };

  const handleHideTable = () => {
    setShowTable(false);
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <h2>Loading your inventory...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ margin: 0 }}>Your Inventory Dashboard</h2>
            <p style={{ color: 'var(--gray)', margin: 0 }}>
              {products.length} products in inventory • {showTable ? 'Viewing products' : 'Search to view products'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <SearchBar 
              onSearch={handleSearch}
              onClear={handleClearSearch}
              searchTerm={searchTerm}
            />
            {!showTable && (
              <button 
                onClick={handleShowAll}
                className="btn btn-primary"
              >
                👁️ See All Products
              </button>
            )}
            {showTable && (
              <button 
                onClick={handleHideTable}
                className="btn btn-outline"
              >
                ❌ Hide Products
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid">
        {editingProduct ? (
          <ProductForm
            onSubmit={handleUpdateProduct}
            initialData={editingProduct}
            isEditing={true}
            onCancel={() => setEditingProduct(null)}
          />
        ) : (
          <ProductForm onSubmit={handleCreateProduct} />
        )}
        <StatsCard products={products} />
      </div>

      {/* Only show table when searching or when See All is clicked */}
      {showTable && (
        <ProductTable
          products={filteredProducts}
          onEdit={setEditingProduct}
          onDelete={handleDeleteProduct}
          searchTerm={searchTerm}
          onHideTable={handleHideTable}
        />
      )}

      {/* Show prompt when no products and table is hidden */}
      {!showTable && products.length === 0 && (
        <div className="card">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <h3>No Products Yet</h3>
            <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
              Start by adding your first product above. Once you have products, you can search for them or view them all.
            </p>
          </div>
        </div>
      )}

      {/* Show prompt when there are products but table is hidden */}
      {!showTable && products.length > 0 && (
        <div className="card">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3>Ready to View Your Products?</h3>
            <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
              You have {products.length} products in your inventory. Search for specific products or view them all.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={handleShowAll}
                className="btn btn-primary"
              >
                👁️ See All {products.length} Products
              </button>
              <p style={{ color: 'var(--gray)', margin: 0, alignSelf: 'center' }}>
                or use the search bar above
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;