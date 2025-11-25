import React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = '', ...props }: DivProps) {
  return (
    <div
      {...props}
      className={`border rounded-lg bg-white p-4 shadow-sm ${className}`}
    />
  );
}

export function CardHeader({ className = '', ...props }: DivProps) {
  return <div {...props} className={`mb-2 ${className}`} />;
}

export function CardTitle({ className = '', ...props }: DivProps) {
  return <h3 {...props} className={`font-semibold text-lg ${className}`} />;
}

export function CardDescription({ className = '', ...props }: DivProps) {
  return <p {...props} className={`text-sm text-gray-500 ${className}`} />;
}

export function CardContent({ className = '', ...props }: DivProps) {
  return <div {...props} className={`${className}`} />;
}
