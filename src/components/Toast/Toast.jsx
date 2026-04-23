import React, { useEffect } from 'react';
import './Toast.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Toast = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'cart':
        return <ShoppingCartIcon className="toast-icon" />;
      case 'favorite':
        return <FavoriteIcon className="toast-icon" />;
      default:
        return <CheckCircleIcon className="toast-icon" />;
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{message}</span>
      </div>
      <div className="toast-progress"></div>
    </div>
  );
};
