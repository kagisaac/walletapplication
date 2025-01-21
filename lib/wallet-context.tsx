"use client";

import React, { createContext, useContext, useState } from 'react';
import { Transaction, Budget, Account } from './types';
import { useToast } from '../components/CustomToast';

interface WalletContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  budgets: Budget[];
  setBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
  accounts: Account[];
  categories: Record<string, string[]>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'Bank Account', balance: 5240.50, type: 'bank' },
    { id: '2', name: 'Mobile Money', balance: 850.75, type: 'mobile' },
    { id: '3', name: 'Cash', balance: 320.00, type: 'cash' },
  ]);

  const categories: Record<string, string[]> = {
    shopping: ["Groceries", "Clothing", "Electronics"],
    food: ["Restaurants", "Coffee", "Takeout"],
    housing: ["Rent", "Utilities", "Maintenance"],
    transport: ["Fuel", "Public Transport", "Car Maintenance"],
    income: ["Salary", "Freelance", "Investments"]
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update account balance
    setAccounts(prev => prev.map(account => {
      if (account.type === transaction.account) {
        return {
          ...account,
          balance: account.balance + (transaction.type === 'income' ? transaction.amount : -transaction.amount)
        };
      }
      return account;
    }));

    // Check budget limits
    const relevantBudget = budgets.find(b => 
      (!b.category || b.category === transaction.category) && 
      transaction.type === 'expense'
    );

    if (relevantBudget) {
      const newSpent = relevantBudget.spent + transaction.amount;
      if (newSpent > relevantBudget.amount) {
        toast({
          title: "Budget Alert",
          description: `You've exceeded your ${relevantBudget.period} budget${relevantBudget.category ? ` for ${relevantBudget.category}` : ''}!`,
        });
      }

      setBudgets(prev => prev.map(budget => 
        budget.id === relevantBudget.id 
          ? { ...budget, spent: newSpent }
          : budget
      ));
    }
  };

  const setBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget: Budget = {
      ...budget,
      id: Math.random().toString(36).substr(2, 9),
      spent: 0,
    };

    setBudgets(prev => [...prev, newBudget]);
  };

  return (
    <WalletContext.Provider value={{
      transactions,
      addTransaction,
      budgets,
      setBudget,
      accounts,
      categories,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}