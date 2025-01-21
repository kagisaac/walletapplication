import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomCard({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 ${className}`}>
      {children}
    </div>
  );
}