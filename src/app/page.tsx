'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Services from '@/components/Services/Services';
import KidsSection from '@/components/KidsSection/KidsSection';
import Products from '@/components/Products/Products';
import Reviews from '@/components/Reviews/Reviews';
import BookingModal from '@/components/BookingModal/BookingModal';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  // Set up scroll animation controller (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Select all components and section titles to animate
    const animElements = document.querySelectorAll(
      '#hero, #services, #kids, #products, #reviews, #about, h2, section > div > div'
    );
    
    animElements.forEach((el) => {
      el.classList.add('fade-in-on-scroll');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <KidsSection />
        <Products />
        <Reviews />
      </main>
      <Footer />

      {/* Modals & Overlays */}
      <BookingModal />
      <CartDrawer />
    </>
  );
}

