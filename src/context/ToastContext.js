import React, { createContext, useContext } from 'react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ToastContainer/ToastContainer';

const ToastContext = createContext();

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const toastMethods = useToast();

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <ToastContainer toasts={toastMethods.toasts} removeToast={toastMethods.removeToast} />
    </ToastContext.Provider>
  );
};
