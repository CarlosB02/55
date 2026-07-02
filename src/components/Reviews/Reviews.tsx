'use client';

import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';

interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  timeAgo: string;
  verified: boolean;
}

export default function Reviews() {
  const reviews: ReviewItem[] = [
    {
      id: 'r1',
      author: 'João Silva',
      avatar: 'JS',
      rating: 5,
      text: 'Corte degradê excelente e a melhor barba da região. O combo VIP +55 vale cada cêntimo, atendimento super atencioso ao detalhe.',
      timeAgo: 'Há 2 semanas',
      verified: true
    },
    {
      id: 'r2',
      author: 'Ricardo Costa',
      avatar: 'RC',
      rating: 5,
      text: 'Espaço espetacular e staff muito profissional. Levei o meu filho e ele adorou a experiência de cortar o cabelo na cadeira do Faísca McQueen.',
      timeAgo: 'Há 1 mês',
      verified: true
    },
    {
      id: 'r3',
      author: 'Pedro Rodrigues',
      avatar: 'PR',
      rating: 5,
      text: 'Atendimento incrível e corte impecável. Sem dúvida a melhor barbearia de Viseu. Recomendo a 100%!',
      timeAgo: 'Há 3 dias',
      verified: true
    },
    {
      id: 'r4',
      author: 'Miguel Mendes',
      avatar: 'MM',
      rating: 5,
      text: 'O serviço VIP é de outro nível: cabelo, barba, black mask e depilação. Saio sempre de lá como novo. Barbearia de confiança.',
      timeAgo: 'Há 1 mês',
      verified: true
    },
    {
      id: 'r5',
      author: 'Nuno Fonseca',
      avatar: 'NF',
      rating: 5,
      text: 'Fácil agendamento online pelo site, pontualidade britânica e profissionais muito competentes. A classificação de 4.9 é mais do que merecida.',
      timeAgo: 'Há 2 meses',
      verified: true
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Minimum swipe distance in pixels
  const minSwipeDistance = 50;

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleCards);

  // Keep currentIndex bounded when visibleCards changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }
  };

  // Helper to render star icons
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={index < rating ? styles.starIconActive : styles.starIconInactive}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  return (
    <section id="reviews" className={`section-slate ${styles.reviewsSection}`}>
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className="badge">A OPINIÃO DOS CLIENTES</span>
          <h2 className={styles.title}>QUEM EXPERIMENTA, <span className="text-gradient">RECOMENDA</span></h2>
          
          {/* Google rating card summary */}
          <div className={styles.ratingSummary}>
            <div className={styles.ratingNumber}>4.9</div>
            <div className={styles.ratingStars}>
              <div className={styles.starsRow}>{renderStars(5)}</div>
              <p className={styles.ratingCount}>Média baseada em avaliações reais no Google</p>
            </div>
            <a 
              href="https://g.page/r/CT8c8P1ScVjjEBM/review" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`btn-secondary ${styles.reviewBtn}`}
            >
              Avaliar no Google
              <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Carousel Slider Wrapper */}
        <div className={styles.sliderWrapper}>
          {/* Left Navigation Arrow */}
          {isMounted && maxIndex > 0 && (
            <button 
              onClick={handlePrev} 
              className={`${styles.navBtn} ${styles.prevBtn} ${currentIndex === 0 ? styles.disabledBtn : ''}`}
              disabled={currentIndex === 0}
              aria-label="Previous review"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          <div className={styles.sliderContainer}>
            <div 
              className={styles.track}
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% + var(--spacing-md)) / ${visibleCards}))`
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className={styles.reviewCard}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.avatar}>
                      {review.avatar}
                    </div>
                    <div className={styles.userInfo}>
                      <h3 className={styles.authorName}>{review.author}</h3>
                      <div className={styles.metadata}>
                        <span className={styles.timeAgo}>{review.timeAgo}</span>
                        {review.verified && (
                          <span className={styles.verifiedBadge}>
                            <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            Verificado
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={styles.googleIconContainer}>
                      <svg className={styles.googleIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.745-.08-1.3-.177-1.854H12.24z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className={styles.ratingStarsLine}>
                    {renderStars(review.rating)}
                  </div>

                  <p className={styles.reviewText}>
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Navigation Arrow */}
          {isMounted && maxIndex > 0 && (
            <button 
              onClick={handleNext} 
              className={`${styles.navBtn} ${styles.nextBtn} ${currentIndex >= maxIndex ? styles.disabledBtn : ''}`}
              disabled={currentIndex >= maxIndex}
              aria-label="Next review"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>

        {/* Pagination Dots */}
        {isMounted && maxIndex > 0 && (
          <div className={styles.dotsContainer}>
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
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
