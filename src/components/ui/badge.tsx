import React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Badge({ className = '', ...props }: DivProps) {
  return (
    <span
      {...props}
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-700 ${className}`}
    />
  );
}
