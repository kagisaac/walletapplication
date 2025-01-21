"use client";

import { ToastProvider } from '@/components/CustomToast';
import { WalletProvider } from '@/lib/wallet-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <WalletProvider>
        {children}
      </WalletProvider>
    </ToastProvider>
  );
}