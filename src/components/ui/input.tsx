import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-md px-3 py-2 text-sm w-full ${className}`}
    />
  );
}
