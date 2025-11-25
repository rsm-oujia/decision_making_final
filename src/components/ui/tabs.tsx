import React from 'react';

export function Tabs({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>{children}</div>
  );
}

export function TabsTrigger({
  value,
  current,
  onClick,
  children,
}: {
  value: string;
  current: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const active = value === current;
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        borderRadius: 6,
        border: '1px solid #ccc',
        background: active ? '#000' : '#fff',
        color: active ? '#fff' : '#333',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  current,
  children,
}: {
  value: string;
  current: string;
  children: React.ReactNode;
}) {
  if (value !== current) return null;
  return <div>{children}</div>;
}
