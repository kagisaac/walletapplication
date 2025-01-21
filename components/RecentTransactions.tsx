"use client";
import { CustomCard } from "./CustomCard";
import { ShoppingBag, Coffee, Home, Car, CreditCard, Wallet, Ban as Bank } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";
import { format } from "date-fns";

const categoryIcons: Record<string, any> = {
  shopping: ShoppingBag,
  food: Coffee,
  housing: Home,
  transport: Car,
  income: CreditCard
};

const accountIcons: Record<string, any> = {
  bank: Bank,
  mobile: CreditCard,
  cash: Wallet
};

export function RecentTransactions() {
  const { transactions } = useWallet();

  const getIcon = (category: string) => {
    return categoryIcons[category.toLowerCase()] || ShoppingBag;
  };

  const getAccountIcon = (account: string) => {
    return accountIcons[account] || Bank;
  };

  return (
    <CustomCard className="p-6">
      <h3 className="font-semibold text-lg mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => {
          const Icon = getIcon(transaction.category);
          const AccountIcon = getAccountIcon(transaction.account);
          
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{transaction.subcategory || transaction.category}</p>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <AccountIcon className="h-4 w-4" />
                      <span className="text-xs">{transaction.account}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{transaction.note}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${transaction.type === 'expense' ? "text-red-600" : "text-green-600"}`}>
                  {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          );
        })}
        {transactions.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No transactions yet. Add your first transaction to get started.
          </div>
        )}
      </div>
    </CustomCard>
  );
}