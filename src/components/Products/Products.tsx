'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import styles from './Products.module.css';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  tag?: string;
}

export default function Products() {
  const { addToCart } = useApp();
  const [addingId, setAddingId] = useState<string | null>(null);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const minSwipeDistance = 50;

  const products: ProductItem[] = [
    {
      id: 'p1',
      name: 'Nº 01 Estimulante Capilar',
      price: 18,
      category: 'Crescimento Capilar',
      description: 'Estimula o crescimento e fortalece o cabelo desde a raiz.',
      image: '/images/products.png',
      tag: 'Mais Vendido'
    },
    {
      id: 'p2',
      name: 'Nº 02 Cera Modeladora',
      price: 15,
      category: 'Cuidados Capilares',
      description: 'Fixação forte com acabamento mate e efeito natural.',
      image: '/images/products.png',
      tag: 'Premium'
    },
    {
      id: 'p3',
      name: 'N° 03 Champô Fortificante',
      price: 22,
      category: 'Champô Fortificante',
      description: 'Limpeza profunda que fortalece e revitaliza o couro cabeludo.',
      image: '/images/products.png'
    },
    {
      id: 'p4',
      name: 'N° 04 Sérum Pós-Barba',
      price: 19,
      category: 'Séruns',
      description: 'Hidrata, acalma a pele e reduz a irritação após o barbear.',
      image: '/images/products.png',
      tag: 'Novo'
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keep currentIndex bounded
  useEffect(() => {
    if (!isMobile) {
      setCurrentIndex(0);
    } else if (currentIndex >= products.length) {
      setCurrentIndex(products.length - 1);
    }
  }, [isMobile, currentIndex, products.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(products.length - 1, prev + 1));
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < products.length - 1) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: ProductItem) => {
    e.preventDefault();
    setAddingId(product.id);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });

    setTimeout(() => {
      setAddingId(null);
    }, 1200);
  };

  return (
    <section id="products" className={`section-dark ${styles.productsSection}`}>
      <div className="container">

        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className="badge">RECOMENDADOS POR NÓS</span>
          <h2 className={styles.title}>O TRATAMENTO QUE TU <span className="text-gradient">MEREÇES</span></h2>
          <p className={styles.subtitle}>
            Leva para casa os produtos que usamos e recomendamos.
          </p>
        </div>

        {/* Carousel / Grid Container */}
        <div className={styles.sliderContainer}>
          <div
            className={styles.track}
            style={isMobile ? {
              transform: `translateX(calc(-${currentIndex} * (100% + var(--spacing-md))))`
            } : undefined}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.imageContainer}>
                  {product.tag && (
                    <span className={styles.productTag}>{product.tag}</span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className={styles.imageOverlay}>
                    <button
                      className={`btn-primary ${styles.overlayBtn} ${addingId === product.id ? styles.adding : ''}`}
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={addingId === product.id}
                    >
                      {addingId === product.id ? 'Adicionado' : 'Adicionar'}
                    </button>
                  </div>
                </div>

                <div className={styles.details}>
                  <span className={styles.category}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.description}>{product.description}</p>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>{product.price.toFixed(2)}€</span>
                    <button
                      className={`${styles.cartIconBtn} ${addingId === product.id ? styles.addingIcon : ''}`}
                      onClick={(e) => handleAddToCart(e, product)}
                      aria-label={`Add ${product.name} to cart`}
                      disabled={addingId === product.id}
                    >
                      {addingId === product.id ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.checkIcon}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Pagination Dots */}
        {isMounted && isMobile && (
          <div className={styles.dotsContainer}>
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
