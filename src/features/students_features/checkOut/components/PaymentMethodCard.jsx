import React from 'react';

const PaymentMethodCard = ({ methodKey, logo, label, selected, disabled, onSelect }) => {
  return (
    <button
      onClick={() => !disabled && onSelect(methodKey)}
      className={`border rounded-lg p-4 transition hover:shadow-md ${
        selected ? 'border-blue-500' : 'border-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <img src={logo} alt={label} className="w-16 h-16 object-contain" />
      <p className="text-sm mt-2 text-center">{label}</p>
    </button>
  );
};

export default PaymentMethodCard;
