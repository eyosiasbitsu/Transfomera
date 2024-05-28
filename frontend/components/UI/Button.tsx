import React from 'react';

interface DynamicButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
  message1: string;
  message2?: string;
  disabled?: boolean;
}

const Button: React.FC<DynamicButtonProps> = ({ onClick, isLoading , message1, message2, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full bg-yellow-300 hover:bg-yellow-200 rounded-lg disabled:bg-gray-400 disabled:text-white text-black px-20 py-3 text-center me-2 mb-2"
    >
      {isLoading ? message2 : message1}
    </button>
  );
};

export default Button;
