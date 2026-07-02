'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './Header.module.css';

export default function Header() {
  const { cart, setIsCartOpen, setIsBookingOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.transparent}`}>
      <div className={`container ${styles.container}`}>
        <a href="#" className={styles.logoContainer} onClick={(e) => handleNavClick(e, 'hero')}>
          <img src="/logo.png" alt="O Corte Logo" style={{ height: '40px', width: 'auto' }} />
        </a>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <div className={styles.mobileMenuHeader}>
          </div>

          <ul className={styles.navList}>
            <li>
              <a href="#services" className={styles.navLink} onClick={(e) => handleNavClick(e, 'services')}>
                Serviços
              </a>
            </li>
            <li>
              <a href="#kids" className={styles.navLink} onClick={(e) => handleNavClick(e, 'kids')}>
                Zona Crianças
              </a>
            </li>
            <li>
              <a href="#products" className={styles.navLink} onClick={(e) => handleNavClick(e, 'products')}>
                Loja
              </a>
            </li>
            <li>
              <a href="#reviews" className={styles.navLink} onClick={(e) => handleNavClick(e, 'reviews')}>
                A Nossa Comunidade
              </a>
            </li>
          </ul>

          <div className={styles.mobileMenuFooter}>
            <div className={styles.mobileDivider}></div>
            <div className={styles.mobileContactInfo}>
              <span className={styles.footerLabel}>CONTACTOS</span>
              <a href="tel:+351912345678" className={styles.mobilePhone}>+351 912 345 678</a>
              <p className={styles.mobileAddress}>Rua Principal, Viseu</p>
            </div>
            <div className={styles.mobileSocials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                Facebook
              </a>
            </div>
          </div>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.cartBtn}
            onClick={() => setIsCartOpen(true)}
            aria-label="Open shopping cart"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className={styles.cartBadge} key={totalItems}>
                {totalItems}
              </span>
            )}
          </button>

          <button
            className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerActive : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
