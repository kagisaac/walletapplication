"use client";

import { Ban as Bank, Wallet, CreditCard } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";
import { CustomCard } from "@/components/CustomCard";

export function AccountsOverview() {
  const { accounts } = useWallet();

  const getIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return Bank;
      case 'mobile':
        return CreditCard;
      case 'cash':
        return Wallet;
      default:
        return Bank;
    }
  };

  return (
    <CustomCard className="p-6 bg-gradient-to-br from-white to-gray-50">
      <h3 className="font-semibold text-lg mb-4 text-gray-900">Accounts Overview</h3>
      <div className="space-y-4">
        {accounts.map((account) => {
          const Icon = getIcon(account.type);
          return (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-indigo-50">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{account.name}</p>
                  <p className="text-sm text-gray-600">
                    ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {accounts.length === 0 && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No accounts added yet</p>
          </div>
        )}
      </div>
    </CustomCard>
  );
}