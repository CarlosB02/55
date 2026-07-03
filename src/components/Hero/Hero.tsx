'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import styles from './Hero.module.css';

export default function Hero() {
  const { setIsBookingOpen } = useApp();

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
    <section id="hero" className={styles.hero}>
      {/* Full-bleed background image */}
      <Image
        src="/images/hero.png"
        alt="O Corte modern editorial barbershop background"
        fill
        priority
        className={styles.bgImage}
      />

      {/* Cinematic dark overlay */}
      <div className={styles.overlay}></div>

      {/* Ambient orange glow in the center */}
      <div className={styles.ambientGlow}></div>

      <div className={`container ${styles.container}`}>
        <div className={styles.content}>

          <h1 className={styles.headline}>
            O TEU CORTE<br />
            A TUA <span className={styles.gradientText}>CONFIANÇA</span>
          </h1>

          <p className={styles.description}>
            Onde cada detalhe faz a diferença.
          </p>

          <div className={styles.ctaGroup}>
            <button
              className="btn-primary"
              onClick={() => setIsBookingOpen(true)}
            >
              Reserva a tua cadeira
            </button>
            <a
              href="#services"
              className={`btn-secondary ${styles.heroBtnSecondary}`}
              onClick={(e) => handleScrollToSection(e, 'services')}
            >
              Conhece os nossos produtos
            </a>
          </div>
        </div>

        {/* Experience horizontal glassmorphic board */}
        <div className={styles.experienceBoard}>
          <div className={styles.boardItem}>
            <span className={styles.boardDot}></span>
            <div>
              <h4 className={styles.boardTitle}>AGENDA DISPONÍVEL</h4>
              <p className={styles.boardDesc}>Reserva online e escolhe o teu profissional.</p>
            </div>
          </div>
          <div className={styles.boardItem}>
            <span className={styles.boardIcon}>📍</span>
            <div>
              <h4 className={styles.boardTitle}>LOCALIZAÇÃO CENTRAL</h4>
              <p className={styles.boardDesc}>R. Prof. Egas Moniz, 3500-848 Viseu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
