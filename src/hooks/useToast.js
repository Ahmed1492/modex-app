import { useState, useCallback } from 'react';

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = toastId++;
    const newToast = { id, message, type, duration };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showCartToast = useCallback((productName) => {
    addToast(`${productName} added to cart!`, 'cart');
  }, [addToast]);

  const showFavoriteToast = useCallback((productName, isAdded) => {
    const message = isAdded
      ? `${productName} added to favorites!`
      : `${productName} removed from favorites!`;
    addToast(message, 'favorite');
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    showCartToast,
    showFavoriteToast,
  };
};
