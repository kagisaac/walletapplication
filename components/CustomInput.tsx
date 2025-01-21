"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}