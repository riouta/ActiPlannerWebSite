import React from 'react';

// Define ButtonProps type including the disabled prop
type ButtonProps = {
  disabled?: boolean;
  onClick: () => void; // Adjust the onClick type as needed
  children: React.ReactNode; // Ensure children prop is included
  type?: "button" | "submit" | "reset"; // Define type prop to accept specific values
};

const Button: React.FC<ButtonProps> = ({ children, disabled, onClick, type }) => {
  return (
    <button onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;
