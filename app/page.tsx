"use client"
import React, { useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { CustomCard } from '../components/CustomCard';
import { Overview } from '../components/Overview';
import { RecentTransactions } from '../components/RecentTransactions';
import { AccountsOverview } from '../components/AccountsOverview';
import { BudgetProgress } from '../components/BudgetProgress';
import { WalletHeader } from '../components/WalletHeader';
import { useToast } from '../components/CustomToast';
import { useWallet } from '../lib/wallet-context';

export default function Home() {
  const { toast } = useToast();
  const { transactions, budgets } = useWallet();
  const lastTransactionIdRef = useRef<string | null>(null);
  const lastBudgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const lastTransaction = transactions[0];
    if (lastTransaction && lastTransaction.id !== lastTransactionIdRef.current) {
      lastTransactionIdRef.current = lastTransaction.id;
      toast({
        title: "New Transaction",
        description: `${lastTransaction.type === 'income' ? 'Income' : 'Expense'} of $${lastTransaction.amount} added to ${lastTransaction.account}`,
      });
    }
  }, [transactions, toast]);

  useEffect(() => {
    const lastBudget = budgets[budgets.length - 1];
    if (lastBudget && lastBudget.id !== lastBudgetIdRef.current) {
      lastBudgetIdRef.current = lastBudget.id;
      toast({
        title: "New Budget Set",
        description: `${lastBudget.period} budget of $${lastBudget.amount} set${lastBudget.category ? ` for ${lastBudget.category}` : ''}`,
      });
    }
  }, [budgets, toast]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <WalletHeader />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AccountsOverview />
          <BudgetProgress />
          <CustomCard className="p-6 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg text-gray-900">Quick Actions</h3>
            </div>
            <div className="space-y-4">
              {transactions.slice(0, 3).map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="text-sm text-gray-600 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {transaction.type === 'income' ? 'Received' : 'Spent'} 
                  <span className="font-medium text-indigo-600">${transaction.amount}</span> 
                  for {transaction.subcategory || transaction.category}
                </div>
              ))}
              {budgets.slice(0, 2).map((budget) => (
                <div 
                  key={budget.id} 
                  className="text-sm text-gray-600 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {budget.period} budget: 
                  <span className="font-medium text-indigo-600">${budget.spent}/${budget.amount}</span> spent
                </div>
              ))}
              {transactions.length === 0 && budgets.length === 0 && (
                <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded-lg text-center">
                  No recent activity. Start by adding a transaction or setting a budget.
                </div>
              )}
            </div>
          </CustomCard>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Overview />
          <RecentTransactions />
        </div>
      </div>
    </main>
  );
}