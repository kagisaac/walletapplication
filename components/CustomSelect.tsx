"use client";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, placeholder, children }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}