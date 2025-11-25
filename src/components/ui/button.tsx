import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "destructive" | "ghost";
  size?: "sm" | "default";
};

export function Button({
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md cursor-pointer";

  const padding = size === "sm" ? "px-2 py-1 text-sm" : "px-3 py-2 text-sm";

  const color =
    variant === "secondary"
      ? "border border-gray-300 bg-white text-gray-800"
      : variant === "destructive"
      ? "bg-red-600 text-white"
      : variant === "ghost"
      ? "bg-transparent text-gray-700"
      : "bg-black text-white";

  return (
    <button
      {...props}
      className={`${base} ${padding} ${color} ${className}`}
    />
  );
}
