// src/components/StatsCard.js
import React from 'react';

// Format currency to South African Rands
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2
  }).format(amount);
};

const StatsCard = ({ products }) => {
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock_quantity < 10).length;
  const totalValue = products.reduce((sum, product) => 
    sum + (parseFloat(product.price) * product.stock_quantity), 0
  );
  const averagePrice = totalProducts > 0 ? totalValue / products.reduce((sum, p) => sum + p.stock_quantity, 0) : 0;

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: '📦',
      color: 'var(--primary)'
    },
    {
      label: 'Low Stock Items',
      value: lowStockCount,
      icon: '⚠️',
      color: 'var(--warning)'
    },
    {
      label: 'Total Inventory Value',
      value: formatCurrency(totalValue),
      icon: '💰',
      color: 'var(--success)'
    },
    {
      label: 'Average Price',
      value: formatCurrency(averagePrice),
      icon: '📊',
      color: 'var(--primary-light)'
    }
  ];

  return (
    <div className="card">
      <h2>Inventory Overview</h2>
      <div className="stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {stat.icon}
              </div>
              <div style={{ fontWeight: '600', color: 'var(--dark)' }}>
                {stat.label}
              </div>
            </div>
            <div 
              className="stat-value"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;