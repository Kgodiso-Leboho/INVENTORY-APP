// src/components/ProductTable.js
import React from 'react';

// Format currency to South African Rands
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2
  }).format(amount);
};

const ProductTable = ({ products, onEdit, onDelete, searchTerm, onHideTable }) => {
  if (products.length === 0) {
    return (
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>Product Inventory</h2>
          <button onClick={onHideTable} className="btn btn-outline">
            ❌ Hide Products
          </button>
        </div>
        {searchTerm ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3>No products found</h3>
            <p style={{ color: 'var(--gray)' }}>
              No products match your search for "<strong>{searchTerm}</strong>". Try different keywords.
            </p>
            <button onClick={onHideTable} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              ↩️ Back to Dashboard
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <h3>No products yet</h3>
            <p style={{ color: 'var(--gray)' }}>
              Add your first product to get started with inventory management.
            </p>
            <button onClick={onHideTable} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              ↩️ Back to Dashboard
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Product Inventory</h2>
          <p style={{ color: 'var(--gray)', margin: 0, fontSize: '0.9rem' }}>
            {searchTerm ? (
              <>Showing {products.length} products matching "<strong>{searchTerm}</strong>"</>
            ) : (
              <>Showing all {products.length} products</>
            )}
          </p>
        </div>
        <button onClick={onHideTable} className="btn btn-outline">
          ❌ Hide Products
        </button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <strong>{product.name}</strong>
                </td>
                <td>
                  <span style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: 'var(--primary)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {product.category}
                  </span>
                </td>
                <td>
                  <strong style={{ color: 'var(--success)' }}>
                    {formatCurrency(product.price)}
                  </strong>
                </td>
                <td className={product.stock_quantity < 10 ? 'low-stock' : ''}>
                  {product.stock_quantity}
                  {product.stock_quantity < 10 && (
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>⚠️ Low</span>
                  )}
                </td>
                <td>{product.description || '-'}</td>
                <td className="action-buttons">
                  <button 
                    onClick={() => onEdit(product)}
                    className="btn btn-primary"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => onDelete(product.id)}
                    className="btn btn-danger"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;