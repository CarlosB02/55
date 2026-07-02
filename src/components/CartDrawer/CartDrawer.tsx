'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useApp();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Disable page scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      // Reset checkout success when closing
      setTimeout(() => setCheckoutSuccess(false), 300);
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isCartOpen]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
    }, 2500);
  };

  if (!isCartOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsCartOpen(false)}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <button 
            className={styles.closeBtn} 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {checkoutSuccess ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>Formula Confirmed</h3>
            <p>Your order has been registered in the laboratory. We will prepare your products for collection or delivery.</p>
          </div>
        ) : cart.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🧪</div>
            <h3>Laboratory Cart Empty</h3>
            <p>You haven&apos;t added any professional grooming products yet.</p>
            <button 
              className="btn-primary" 
              onClick={() => setIsCartOpen(false)}
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.productImg}>
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      sizes="60px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <span className={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)}€</span>
                    
                    <div className={styles.quantityControls}>
                      <button 
                        className={styles.qtyBtn} 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className={styles.qtyVal}>{item.quantity}</span>
                      <button 
                        className={styles.qtyBtn} 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span className={styles.totalPrice}>{subtotal.toFixed(2)}€</span>
              </div>
              <p className={styles.terms}>Shipping and taxes calculated at checkout. Available for click &amp; collect in Viseu.</p>
              <button className={`btn-primary ${styles.checkoutBtn}`} onClick={handleCheckout}>
                Secure Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
