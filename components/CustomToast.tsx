import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: string;
  title: string;
  description: string;
}

interface ToastContextType {
  toast: (props: { title: string; description: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description }: { title: string; description: string }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-lg shadow-lg p-4 transform transition-all duration-300 hover:scale-102 max-w-sm"
          >
            <h4 className="font-semibold text-gray-900">{t.title}</h4>
            <p className="text-gray-600 text-sm mt-1">{t.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};