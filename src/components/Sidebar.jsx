import React from 'react';

function Sidebar({ onShopNow }) {
  return (
    <aside style={{
      background: 'linear-gradient(135deg, #1e1e1e 0%, #121212 100%)',
      border: 'none', // Tinanggal na ang itim na guhit/border
      borderRadius: '20px',
      margin: '0 40px 30px 40px',
      padding: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '2.8rem', color: '#facc15', marginBottom: '16px', fontWeight: 'bold' }}>
          Upgrade Your Tech
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#a1a1aa', marginBottom: '24px', lineHeight: '1.6' }}>
          Latest gadgets, better life. Find the best electronics at the best prices.
        </p>
        <button 
          onClick={onShopNow}
          style={{
            background: '#facc15',
            color: '#121212',
            border: 'none',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(250, 204, 21, 0.3)'
          }}
        >
          Shop Now →
        </button>
      </div>

      <div style={{
        background: 'transparent',
        border: 'none', // Tinanggal din ang border sa loob ng image container
        borderRadius: '16px',
        padding: '0',
        width: '380px',
        height: '240px',
        overflow: 'hidden'
      }}>
        <img 
          src="/photodesgn.jpg" 
          alt="Tech Banner Design" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} 
        />
      </div>
    </aside>
  );
}

export default Sidebar;