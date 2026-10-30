import React from 'react';

function Navbar({ searchTerm, setSearchTerm, onScrollToProducts, cartCount }) {
  return (
    <nav style={{
      position: 'sticky',
      top: '0',
      zIndex: 9999,
      background: '#1e1e1e',
      borderBottom: '1px solid #2e2e2e',
      borderRadius: '0 0 16px 16px',
      margin: '0 40px 20px 40px',
      padding: '16px 28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center', cursor: 'pointer' }}>
        <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.05rem' }}>Home</span>
        <span onClick={onScrollToProducts} style={{ color: '#a1a1aa', fontWeight: '500', fontSize: '1.05rem' }}>Products</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          background: '#121212',
          border: '1px solid #2e2e2e',
          borderRadius: '12px',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '260px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', color: '#fff', fontSize: '0.9rem' }}
          />
        </div>

        <div title="Cart" style={{
          background: '#121212',
          border: '1px solid #2e2e2e',
          borderRadius: '12px',
          padding: '10px 14px',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: '#facc15',
              color: '#121212',
              fontSize: '10px',
              fontWeight: 'bold',
              borderRadius: '50%',
              padding: '2px 6px',
              minWidth: '18px',
              textAlign: 'center'
            }}>
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;