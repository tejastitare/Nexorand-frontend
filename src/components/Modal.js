import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700">✖️</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
