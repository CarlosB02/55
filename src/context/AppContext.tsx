'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface BookingDetails {
  service: string;
  date: string;
  time: string;
  barber: string;
  name: string;
  email: string;
  phone: string;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (isOpen: boolean) => void;
  bookingService: string | null;
  openBookingWithService: (serviceName: string) => void;
  bookingStep: number;
  setBookingStep: (step: number) => void;
  bookingDetails: BookingDetails;
  updateBookingDetails: (details: Partial<BookingDetails>) => void;
  resetBooking: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    service: '',
    date: '',
    time: '',
    barber: '',
    name: '',
    email: '',
    phone: '',
  });

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true); // Open drawer on addition for micro-interaction feedback
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const openBookingWithService = (serviceName: string) => {
    setBookingService(serviceName);
    setBookingDetails((prev) => ({ ...prev, service: serviceName }));
    setBookingStep(1);
    setIsBookingOpen(true);
  };

  const updateBookingDetails = (details: Partial<BookingDetails>) => {
    setBookingDetails((prev) => ({ ...prev, ...details }));
  };

  const resetBooking = () => {
    setBookingService(null);
    setBookingStep(1);
    setBookingDetails({
      service: '',
      date: '',
      time: '',
      barber: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isBookingOpen,
        setIsBookingOpen,
        bookingService,
        openBookingWithService,
        bookingStep,
        setBookingStep,
        bookingDetails,
        updateBookingDetails,
        resetBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
