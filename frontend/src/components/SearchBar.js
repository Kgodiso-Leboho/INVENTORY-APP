// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ onSearch, onClear, searchTerm }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <div style={{ position: 'relative', minWidth: '300px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="🔍 Search products by name, category..."
          value={searchTerm}
          onChange={handleChange}
          style={{
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            border: '2px solid var(--gray-light)',
            borderRadius: '12px',
            fontSize: '1rem',
            width: '100%',
            background: 'var(--white)',
            transition: 'all 0.3s ease'
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--gray)'
          }}
        >
          🔍
        </span>
        {searchTerm && (
          <button
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--gray)',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;