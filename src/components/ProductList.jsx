import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, filteredProducts, categories, selectedCategory, setSelectedCategory, onOpenAddModal, onSelectProduct }) {
  const featuredProducts = products.slice(0, 5);

  return (
    <div className="list-container" style={{ padding: '0 40px' }}>
      
      {}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '20px', fontWeight: 'bold' }}>Featured Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '20px' }}>
          {featuredProducts.map((product) => (
            <ProductCard 
              key={`featured-${product.id}`} 
              product={product} 
              onClick={() => onSelectProduct(product)} 
            />
          ))}
        </div>
      </div>

      {}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: 0, fontWeight: 'bold' }}>Product List</h2>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ background: '#1e1e1e', border: '1px solid #2e2e2e', color: '#fff', padding: '8px 14px', borderRadius: '8px', outline: 'none', cursor: 'pointer' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button 
              onClick={onOpenAddModal}
              style={{ background: '#facc15', color: '#121212', border: 'none', padding: '9px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              + Add New
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onSelectProduct(product)} 
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default ProductList;