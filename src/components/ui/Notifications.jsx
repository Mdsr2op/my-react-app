import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useNotification } from '../../context';

const Notifications = () => {
  const { notifications } = useNotification();
  
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`
            animate-slide-in-right bg-white rounded-lg shadow-xl p-4 
            flex items-center space-x-3 min-w-[300px] border-l-4
            ${notification.type === 'success' ? 'border-green-500' : ''}
            ${notification.type === 'error' ? 'border-red-500' : ''}
            ${notification.type === 'info' ? 'border-blue-500' : ''}
          `}
        >
          {notification.type === 'success' && <CheckCircle className="text-green-500" size={20} />}
          {notification.type === 'error' && <XCircle className="text-red-500" size={20} />}
          {notification.type === 'info' && <Info className="text-blue-500" size={20} />}
          <span className="text-gray-800">{notification.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Notifications; 