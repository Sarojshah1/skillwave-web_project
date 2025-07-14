import React, { createContext, useContext } from 'react';
import { useToast } from '@/features/tutor_features/courses/hooks/use-Toast';
import { ToastContainer } from './toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastApi = useToast();
  return (
    <ToastContext.Provider value={toastApi}>
      <ToastContainer toasts={toastApi.toasts} onDismiss={toastApi.dismiss} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext); 