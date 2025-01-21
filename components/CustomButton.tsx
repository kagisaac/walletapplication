"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'default', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}