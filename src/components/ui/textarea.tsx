import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...props }: Props) {
  return (
    <textarea
      {...props}
      className={`border border-gray-300 rounded-md px-3 py-2 text-sm w-full resize-vertical ${className}`}
    />
  );
}
