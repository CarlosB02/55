'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './BookingModal.module.css';

const SERVICES = [
  'SERVICO +55 VIP',
  'CORTE DEGRADE + BARBA + SOBRANCELHA',
  'CORTE DEGRADE + BARBA',
  'CORTE SIMPLES + BARBA',
  'CORTE + MADEIXAS',
  'CORTE + BARBA + MADEIXAS',
  'CORTE + PIGMENTAÇÃO',
  'CORTE DEGRADE',
  'CORTE SIMPLES',
  'CORTE CRIANÇA',
  'MADEIXAS',
  'CORTE TODO NA ZERO',
  'CORTE + RISQUINHO',
  'ACABAMENTO + PENTEADO',
  'BARBA PREMIUM',
  'BARBA SIMPLES',
  'Black Mask + Limpeza de Pele',
  'DEPILAÇÃO CERA',
  'HIDRATAÇÃO CAPILAR',
  'REALIAMENTO CAPILAR',
  'SOBRANCELHA'
];

const BARBERS = [
  { id: 'b1', name: 'Natan Santos' },
  { id: 'b2', name: 'Lucão' }
];

const TIME_SLOTS = [
  '09:00', '09:45', '10:30', '11:15', '12:00',
  '14:00', '14:45', '15:30', '16:15', '17:00', '17:45', '18:30'
];

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function BookingModal() {
  const {
    isBookingOpen,
    setIsBookingOpen,
    bookingStep,
    setBookingStep,
    bookingDetails,
    updateBookingDetails,
    resetBooking
  } = useApp();

  const [currentDate, setCurrentDate] = useState(new Date());
  const timeSlotsRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Scroll content to top when step changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [bookingStep]);

  // Scroll to time slots when a date is selected
  useEffect(() => {
    if (bookingDetails.date && timeSlotsRef.current) {
      const timer = setTimeout(() => {
        timeSlotsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [bookingDetails.date]);

  // Disable scroll when modal is active
  useEffect(() => {
    if (isBookingOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isBookingOpen]);

  const handleNext = () => {
    if (bookingStep === 1 && (!bookingDetails.service || !bookingDetails.barber || !bookingDetails.date || !bookingDetails.time)) return;
    if (bookingStep === 2 && (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone)) return;
    setBookingStep(bookingStep + 1);
  };

  const handleBack = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setTimeout(() => {
      resetBooking();
      setCurrentDate(new Date());
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep(3); // Success step
  };

  // Calendar logic
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust so Monday is 0
  };

  const handlePrevMonth = () => {
    const now = new Date();
    if (currentDate.getFullYear() === now.getFullYear() && currentDate.getMonth() === now.getMonth()) {
      return;
    }
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const totalDays = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  const days = [];

  // Previous month padding days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      dayNum: prevMonthDays - i,
      isCurrentMonth: false,
      dateStr: '',
      disabled: true,
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    const dateObj = new Date(year, month, i);
    const yearStr = dateObj.getFullYear();
    const monthStr = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dayStr = String(dateObj.getDate()).padStart(2, '0');
    const dateStr = `${yearStr}-${monthStr}-${dayStr}`;

    const isSunday = dateObj.getDay() === 0;
    const isDisabled = dateObj < today || isSunday;

    days.push({
      dayNum: i,
      isCurrentMonth: true,
      dateStr,
      disabled: isDisabled,
    });
  }

  const formatFriendlyDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (!isBookingOpen) return null;

  const isCurrentMonthMin = currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth();

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.stepIndicator}>
            {bookingStep < 3 ? `Passo ${bookingStep} de 2` : 'Marcação Concluída'}
          </div>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Fechar modal de reservas"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {bookingStep < 3 && (
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${(bookingStep / 2) * 100}%` }}
            ></div>
          </div>
        )}

        <div ref={contentRef} className={styles.content}>
          {/* STEP 1: BARBER & DATE & TIME */}
          {bookingStep === 1 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Agendar Atendimento</h3>
              <p className={styles.stepSubtitle}>Escolha o profissional, data e hora da sua marcação.</p>

              {/* Service Selection (Fallback if not selected on main page) */}
              <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                <label className={styles.label}>Serviço Pretendido</label>
                <select
                  value={bookingDetails.service}
                  onChange={(e) => updateBookingDetails({ service: e.target.value })}
                  className={styles.input}
                  style={{ width: '100%', cursor: 'pointer' }}
                >
                  <option value="" disabled>-- Selecione um serviço --</option>
                  {SERVICES.map((srv) => (
                    <option key={srv} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>

              {/* Barber selection */}
              <h4 className={styles.subLabel}>1. O Profissional</h4>
              <div className={styles.barbersGrid} style={{ marginBottom: '20px' }}>
                {BARBERS.map((barber) => (
                  <button
                    key={barber.id}
                    className={`${styles.barberCard} ${bookingDetails.barber === barber.name ? styles.selectedCard : ''}`}
                    onClick={() => updateBookingDetails({ barber: barber.name })}
                  >
                    <h5 className={styles.barberName}>{barber.name}</h5>
                  </button>
                ))}
              </div>

              {/* Date selection (Monthly Calendar) */}
              <h4 className={styles.subLabel}>2. Selecione a Data</h4>
              <div className={styles.calendarContainer}>
                <div className={styles.calendarHeader}>
                  <span className={styles.monthTitle}>{MONTHS[month]} {year}</span>
                  <div className={styles.monthNav}>
                    <button
                      type="button"
                      className={styles.monthNavBtn}
                      onClick={handlePrevMonth}
                      disabled={isCurrentMonthMin}
                      aria-label="Mês anterior"
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      className={styles.monthNavBtn}
                      onClick={handleNextMonth}
                      aria-label="Próximo mês"
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                <div className={styles.weekdaysGrid}>
                  {WEEKDAYS.map((day) => (
                    <span key={day} className={styles.weekdayLabel}>{day}</span>
                  ))}
                </div>

                <div className={styles.daysGrid}>
                  {days.map((day, index) => {
                    const isSelected = bookingDetails.date === day.dateStr;
                    const isToday = day.dateStr === today.toISOString().split('T')[0];

                    if (!day.isCurrentMonth) {
                      return <div key={`empty-${index}`} className={styles.otherMonthDay}>{day.dayNum}</div>;
                    }

                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        className={`${styles.dayCell} ${isSelected ? styles.selectedDay : ''} ${isToday ? styles.todayDay : ''} ${day.disabled ? styles.disabledDay : ''}`}
                        onClick={() => !day.disabled && updateBookingDetails({ date: day.dateStr, time: '' })}
                        disabled={day.disabled}
                      >
                        {day.dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time selection (only shows if date is selected) */}
              {bookingDetails.date && (
                <div ref={timeSlotsRef} style={{ marginTop: '20px' }}>
                  <h4 className={styles.subLabel}>3. Horários Disponíveis</h4>
                  <div className={styles.timesGrid}>
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        className={`${styles.timeCard} ${bookingDetails.time === time ? styles.selectedCard : ''}`}
                        onClick={() => updateBookingDetails({ time })}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: CONTACT FORM */}
          {bookingStep === 2 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Informações de Contacto</h3>
              <p className={styles.stepSubtitle}>Introduza os seus dados para confirmar a reserva em Viseu.</p>

              <form id="booking-contact-form" onSubmit={handleFormSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="client-name" className={styles.label}>Nome Completo</label>
                  <input
                    type="text"
                    id="client-name"
                    required
                    value={bookingDetails.name}
                    onChange={(e) => updateBookingDetails({ name: e.target.value })}
                    className={styles.input}
                    placeholder="ex. João Silva"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="client-email" className={styles.label}>Endereço de E-mail</label>
                  <input
                    type="email"
                    id="client-email"
                    required
                    value={bookingDetails.email}
                    onChange={(e) => updateBookingDetails({ email: e.target.value })}
                    className={styles.input}
                    placeholder="ex. joao@exemplo.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="client-phone" className={styles.label}>Número de Telemóvel</label>
                  <input
                    type="tel"
                    id="client-phone"
                    required
                    value={bookingDetails.phone}
                    onChange={(e) => updateBookingDetails({ phone: e.target.value })}
                    className={styles.input}
                    placeholder="ex. 912 345 678"
                  />
                </div>

                <div className={styles.bookingSummary}>
                  <h4>Resumo do Agendamento</h4>
                  <p><strong>Serviço:</strong> {bookingDetails.service}</p>
                  <p><strong>Profissional:</strong> {bookingDetails.barber}</p>
                  <p><strong>Data/Hora:</strong> {formatFriendlyDate(bookingDetails.date)} às {bookingDetails.time}</p>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {bookingStep === 3 && (
            <div className={styles.successState}>
              <div className={styles.successIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className={styles.successTitle}>Lugar Reservado!</h3>
              <p className={styles.successText}>
                A sua reserva no +55 foi confirmada. Um convite de calendário e confirmação foram enviados para <strong>{bookingDetails.email}</strong>.
              </p>

              <div className={styles.summaryBox}>
                <p>📍 R. Prof. Egas Moniz, 36
                  3500-848 Viseu</p>
                <p>⚡ Barbeiro: {bookingDetails.barber}</p>
                <p>📅 Horário: {formatFriendlyDate(bookingDetails.date)} @ {bookingDetails.time}</p>
              </div>

              <button className="btn-primary" onClick={handleClose}>
                Concluído
              </button>
            </div>
          )}
        </div>

        {/* Footer controls for step 1 */}
        {bookingStep === 1 && (
          <div className={styles.footer}>
            <button
              className={`btn-secondary ${styles.backBtn}`}
              onClick={handleBack}
              disabled={true}
              style={{ opacity: 0.3 }}
            >
              Voltar
            </button>
            <button
              className="btn-primary"
              onClick={handleNext}
              disabled={
                !bookingDetails.service || !bookingDetails.barber || !bookingDetails.date || !bookingDetails.time
              }
            >
              Continuar
            </button>
          </div>
        )}

        {/* Footer controls for step 2 */}
        {bookingStep === 2 && (
          <div className={styles.footer}>
            <button
              type="button"
              className={`btn-secondary ${styles.backBtn}`}
              onClick={handleBack}
            >
              Voltar
            </button>
            <button
              type="submit"
              form="booking-contact-form"
              className="btn-primary"
            >
              Confirmar Marcação
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

