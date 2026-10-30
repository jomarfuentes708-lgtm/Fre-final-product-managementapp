import React, { useState, useRef, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import { initialProducts } from './data/products';
import './App.css';

function App() {
  const [products, setProducts] = useState(Array.isArray(initialProducts) ? initialProducts : []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [cartItems, setCartItems] = useState([]);
  const productListRef = useRef(null);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const scrollToProducts = () => {
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // AUTOMATIC SCROLL PABABA KAPAG NAG-SEARCH KA
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      scrollToProducts();
    }
  }, [searchTerm]);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const handleIncreaseQty = () => {
    if (!selectedProduct) return;
    const newStock = Number(selectedProduct.stock || 0) + 1;
    
    setSelectedProduct(prev => ({ ...prev, stock: newStock }));
    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, stock: newStock } : p));
  };

  const handleDecreaseQty = () => {
    if (!selectedProduct) return;
    const newStock = Math.max(1, Number(selectedProduct.stock || 0) - 1);
    
    setSelectedProduct(prev => ({ ...prev, stock: newStock }));
    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, stock: newStock } : p));
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const qtyToAdd = Number(selectedProduct.stock || 1);

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === selectedProduct.id);
      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex].quantity += qtyToAdd;
        return updated;
      } else {
        return [...prevItems, { ...selectedProduct, quantity: qtyToAdd }];
      }
    });

    alert(`${qtyToAdd}x ${selectedProduct.name} added to cart!`);
    setSelectedProduct(null);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isModalLowStock = selectedProduct && Number(selectedProduct.stock) < 5;

  return (
    <div className="app-container">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onScrollToProducts={scrollToProducts}
        cartCount={totalCartCount}
      />

      <main className="main-content">
        <Sidebar onShopNow={scrollToProducts} />

        <div ref={productListRef}>
          <ProductList
            products={products}
            filteredProducts={filteredProducts}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onSelectProduct={handleOpenProductDetail}
          />
        </div>
      </main>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div className="modal-detail-box" onClick={(e) => e.stopPropagation()} style={{ background: '#1e1e1e', border: '1px solid #facc15', padding: '28px', borderRadius: '12px', width: '580px', maxWidth: '90%', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.9)' }}>
            <div className="modal-detail-grid" style={{ display: 'flex', gap: '20px' }}>
              <div className="modal-img-container" style={{ position: 'relative', width: '220px', height: '220px', background: '#fff', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                {isModalLowStock && (
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#dc2626', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', zIndex: 2 }}>
                    LOW STOCK
                  </span>
                )}
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <div className="modal-detail-info" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '6px', color: '#fff' }}>{selectedProduct.name}</h2>
                  <p style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Category: <span style={{ background: '#2e2e2e', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>{selectedProduct.category}</span> | 
                    <span>Rating:</span> 
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginLeft: '2px' }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span style={{ color: '#facc15', fontWeight: 'bold' }}>{selectedProduct.rating || '4.6'}</span>
                  </p>
                  <p style={{ fontSize: '0.88rem', marginBottom: '10px', color: '#d4d4d8' }}>{selectedProduct.description}</p>
                  {selectedProduct.specifications && (
                    <p style={{ fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '12px' }}>{selectedProduct.specifications}</p>
                  )}
                  <p style={{ fontSize: '1.3rem', color: '#facc15', fontWeight: 'bold', marginBottom: '12px' }}>₱{selectedProduct.price ? Number(selectedProduct.price).toLocaleString() : 0}</p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <label style={{ fontSize: '0.9rem' }}>Quantity:</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #2e2e2e', borderRadius: '4px', overflow: 'hidden' }}>
                      <button type="button" onClick={handleDecreaseQty} style={{ background: '#121212', color: '#fff', border: 'none', padding: '4px 12px', cursor: 'pointer', fontSize: '1rem' }}>-</button>
                      <span style={{ padding: '0 14px', background: '#1e1e1e', fontSize: '0.95rem' }}>{selectedProduct.stock}</span>
                      <button type="button" onClick={handleIncreaseQty} style={{ background: '#121212', color: '#fff', border: 'none', padding: '4px 12px', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px', fontSize: '0.95rem' }}>
                    Subtotal: <strong style={{ color: '#fff' }}>₱{((selectedProduct.price || 0) * selectedProduct.stock).toLocaleString()}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={handleAddToCart}
                      style={{ flex: 1, background: '#facc15', color: '#121212', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      style={{ background: '#2e2e2e', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      <AddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}

export default App;