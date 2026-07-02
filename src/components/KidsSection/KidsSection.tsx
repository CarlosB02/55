'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import styles from './KidsSection.module.css';

export default function KidsSection() {
  const { openBookingWithService } = useApp();

  return (
    <section id="kids" className={`section-slate ${styles.kidsSection}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.visualColumn}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/kids.png"
              alt="Lightning McQueen race car themed barber chair"
              fill
              className={styles.kidsImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={styles.glowEffect}></div>
          </div>
        </div>

        <div className={styles.contentColumn}>
          <h2 className={styles.headline}>
            PRONTO? PARTIDA.
            <span className="text-gradient"> CORTE!</span>
          </h2>

          <p className={styles.description}>
            Na nossa cadeira Faísca McQueen,
            <strong> cortar o cabelo deixa de ser uma obrigação e passa a ser uma aventura.</strong>
          </p>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <span className={styles.icon}>
                <Image src="/raio.png" alt="Ícone Raio" width={56} height={56} style={{ objectFit: 'contain' }} />
              </span>
              <div>
                <h4 className={styles.featureTitle}>Cadeira Faisca McQueen</h4>
                <p className={styles.featureDesc}>Para transformar o corte numa verdadeira aventura.</p>
              </div>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => openBookingWithService('Kids Haircut')}
          >
            Marcar Corte Criança (11€)
          </button>
        </div>
      </div>
    </section>
  );
}
