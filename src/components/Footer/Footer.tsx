'use client';

import React, { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="about" className={`section-slate ${styles.footer}`}>
      <div className={`container ${styles.container}`}>

        {/* Column 1: Brand & Bio */}
        <div className={styles.columnBrand}>
          <a href="#" className={styles.logoContainer} onClick={handleScrollToTop}>
            <img src="/logo.png" alt="O Corte Logo" style={{ height: '50px', width: 'auto' }} />
          </a>
          <p className={styles.bio}>
            Mais do que uma barbearia, um espaço onde cada corte é feito com atenção ao detalhe. Marca online, aparece e deixa o resto connosco.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Hours */}
        <div className={styles.column}>
          <h3 className={styles.title}>Horário</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.day}>Seg — Sex</span>
              <span className={styles.time}>09:00 — 19:30</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.day}>Sábado</span>
              <span className={styles.time}>09:00 — 18:00</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.day}>Domingo</span>
              <span className={styles.time}>Fechado</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Location */}
        <div className={styles.column}>
          <h3 className={styles.title}>Contactos</h3>
          <p className={styles.address}>
            R. Prof. Egas Moniz, 36<br />
            3500-848 Viseu, Portugal
          </p>
          <p className={styles.contactInfo}>
            📞 +351 926 325 847<br />
            ✉️ geral@55.pt
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            Encontra no Google Maps ↗
          </a>
        </div>

        {/* Column 4: Newsletter */}
        <div className={styles.columnNewsletter}>
          <h3 className={styles.title}>Novidades</h3>
          <p className={styles.newsletterDesc}>
            Recebe novidades, campanhas, novos produtos e dicas de grooming diretamente no teu email.
          </p>

          <form onSubmit={handleSubscribe} className={styles.form}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={styles.input}
                aria-label="Email para Novidades"
              />
              <button type="submit" className={styles.submitBtn} aria-label="Subscribe">
                →
              </button>
            </div>
            {subscribed && (
              <span className={styles.subscribedMsg}>Subscribed! Thank you.</span>
            )}
          </form>
        </div>

      </div>

      <div className={`container ${styles.bottomBar}`}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} +55. Todos os direitos reservados. Designed by E-Nimble
        </p>
        <div className={styles.legalLinks}>
          <a href="#">Politica de Privacidade</a>
          <a href="#">Termos &amp; Condições</a>
          <a href="#">Livro de Reclamações</a>
        </div>
      </div>
    </footer>
  );
}
