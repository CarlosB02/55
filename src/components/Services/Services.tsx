'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './Services.module.css';

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  popular?: boolean;
  duration?: string;
}

interface ServiceCategory {
  id: string;
  label: string;
  services: ServiceItem[];
}

export default function Services() {
  const { openBookingWithService } = useApp();
  const [activeTab, setActiveTab] = useState('combos');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);

  const categories: ServiceCategory[] = [
    {
      id: 'combos',
      label: 'Combos',
      services: [
        { id: 'combo-vip', name: 'SERVICO +55 VIP', price: 28, description: 'Cabelo + barba + sobrancelha + black mask + depilaçao nariz e lavagem.', duration: '60 min' },
        { id: 'combo-dgs', name: 'CORTE DEGRADE + BARBA + SOBRANCELHA', price: 19, description: 'Visual completo em um único atendimento! Corte estiloso, barba desenhada e sobrancelha alinhada.', popular: true, duration: '50 min' },
        { id: 'combo-dgb', name: 'CORTE DEGRADE + BARBA', price: 16, duration: '45 min' },
        { id: 'combo-smb', name: 'CORTE SIMPLES + BARBA', price: 14, duration: '40 min' },
        { id: 'combo-mad', name: 'CORTE + MADEIXAS', price: 45, duration: '90 min' },
        { id: 'combo-cbm', name: 'CORTE + BARBA + MADEIXAS', price: 45, duration: '105 min' },
        { id: 'combo-cpi', name: 'CORTE + PIGMENTAÇÃO', price: 15, duration: '45 min' }
      ]
    },
    {
      id: 'cabelo',
      label: 'Cabelo',
      services: [
        { id: 'cab-deg', name: 'CORTE DEGRADE', price: 11, popular: true, duration: '30 min' },
        { id: 'cab-sim', name: 'CORTE SIMPLES', price: 10, duration: '30 min' },
        { id: 'cab-cri', name: 'CORTE CRIANÇA', price: 11, duration: '30 min' },
        { id: 'cab-mad', name: 'MADEIXAS', price: 37, duration: '60 min' },
        { id: 'cab-zer', name: 'CORTE TODO NA ZERO', price: 8, duration: '20 min' },
        { id: 'cab-ris', name: 'CORTE + RISQUINHO', price: 13, description: 'Desenho artístico no corte para um visual personalizado.', duration: '40 min' },
        { id: 'cab-aca', name: 'ACABAMENTO + PENTEADO', price: 7, duration: '20 min' }
      ]
    },
    {
      id: 'barba',
      label: 'Barba',
      services: [
        { id: 'brb-pre', name: 'BARBA PREMIUM', price: 9, description: 'Limpeza profunda, hidratação e terapia com ozônio para revitalizar pele e fios.', duration: '30 min' },
        { id: 'brb-sim', name: 'BARBA SIMPLES', price: 7, description: 'Opção rápida para remover toda a barba.', duration: '20 min' }
      ]
    },
    {
      id: 'tratamentos',
      label: 'Tratamentos',
      services: [
        { id: 'trt-msk', name: 'Black Mask + Limpeza de Pele', price: 7, description: 'Remova cravos e impurezas com limpeza profunda.', duration: '20 min' },
        { id: 'trt-cer', name: 'DEPILAÇÃO CERA', price: 6, description: 'Nariz e orelha: remoção eficaz com cera quente.', duration: '15 min' },
        { id: 'trt-hid', name: 'HIDRATAÇÃO CAPILAR', price: 7, description: 'Revitalize o brilho e saúde dos fios.', duration: '25 min' },
        { id: 'trt-rea', name: 'REALIAMENTO CAPILAR', price: 35, description: 'Selagem masculina. Fios disciplinados e sem frizz.', duration: '60 min' }
      ]
    },
    {
      id: 'extra',
      label: 'Extra',
      services: [
        { id: 'ext-sob', name: 'SOBRANCELHA', price: 2, duration: '10 min' }
      ]
    }
  ];

  const currentCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

  const isSelected = (serviceId: string) => {
    return selectedServices.some((s) => s.id === serviceId);
  };

  const toggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      if (prev.some((s) => s.id === service.id)) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const removeService = (serviceId: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  const handleCheckout = () => {
    if (selectedServices.length === 0) return;
    const joinedNames = selectedServices.map((s) => s.name).join(' + ');
    openBookingWithService(joinedNames);
  };

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <section id="services" className={`section-light ${styles.services}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Escolha os Serviços</h2>
          <p className={styles.subtitle}>
            Selecione um ou mais serviços para o seu atendimento. Lavagem completa gratuita inclusa em todos os cortes!
          </p>
        </div>

        {/* Tab Controls */}
        <div className={styles.tabContainer}>
          <div className={styles.tabs}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.tabBtn} ${activeTab === category.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {currentCategory.services.map((service) => {
            const selected = isSelected(service.id);
            return (
              <div
                key={service.id}
                className={`${styles.serviceCard} ${service.popular ? styles.popularCard : ''} ${selected ? styles.selectedCard : ''}`}
                onClick={() => toggleService(service)}
                style={{ cursor: 'pointer' }}
              >
                {service.popular && (
                  <span className={styles.popularBadge}>DESTAQUE</span>
                )}
                <div className={styles.cardHeader}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <span className={styles.servicePrice}>{service.price}€</span>
                </div>
                
                {service.description && (
                  <p className={styles.description}>{service.description}</p>
                )}
                
                <div className={styles.cardFooter}>
                  <div className={styles.durationContainer}>
                    {service.duration && (
                      <>
                        <svg className={styles.clockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{service.duration}</span>
                      </>
                    )}
                  </div>
                  
                  <button
                    className={`${styles.addBtn} ${selected ? styles.selectedAddBtn : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleService(service);
                    }}
                    aria-label={selected ? "Remover serviço" : "Adicionar serviço"}
                  >
                    {selected ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : '+'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Booking Summary Bar */}
      {selectedServices.length > 0 && (
        <div className={styles.stickyBar}>
          <div className={styles.barLeft}>
            <div className={styles.serviceCount}>
              {selectedServices.length} {selectedServices.length === 1 ? 'SERVIÇO SELECIONADO' : 'SERVIÇOS SELECIONADOS'}
            </div>
            <div className={styles.totalPrice}>
              <span className={styles.totalLabel}>TOTAL: </span>
              {totalPrice}€
            </div>
            <div className={styles.badgeList}>
              {selectedServices.map((service) => (
                <div key={service.id} className={styles.badge}>
                  <span>{service.name}</span>
                  <button
                    className={styles.removeBadge}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeService(service.id);
                    }}
                    aria-label={`Remover ${service.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            FINALIZAR AGENDAMENTO
          </button>
        </div>
      )}
    </section>
  );
}
