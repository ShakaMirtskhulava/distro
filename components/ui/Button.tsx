import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  width?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function Button({ children, type, className, onClick, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type ? type : "button"}
      onClick={onClick}
      className={`${className} rounded-md p-2 px-4`}
    >
      {children}
    </button>
  );
}
