"use client";

import { AlertCircle } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";
import { CustomCard } from "./CustomCard";

export function BudgetProgress() {
  const { budgets } = useWallet();

  if (budgets.length === 0) {
    return (
      <CustomCard className="p-6 bg-gradient-to-br from-white to-gray-50">
        <h3 className="font-semibold text-lg mb-4 text-gray-900">Budget Overview</h3>
        <p className="text-gray-500">No budgets set. Click "Set Budget" to get started.</p>
      </CustomCard>
    );
  }

  return (
    <CustomCard className="p-6 bg-gradient-to-br from-white to-gray-50">
      <h3 className="font-semibold text-lg mb-4 text-gray-900">Budget Overview</h3>
      <div className="space-y-6">
        {budgets.map((budget) => {
          const progress = (budget.spent / budget.amount) * 100;
          const isExceeding = budget.spent > budget.amount;

          return (
            <div key={budget.id} className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} Budget
                    {budget.category ? ` (${budget.category})` : ''}
                  </span>
                  <span className="text-sm font-medium text-gray-900">${budget.amount.toLocaleString()}</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${
                      isExceeding ? 'bg-red-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Spent</span>
                <span className="font-medium text-gray-900">${budget.spent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remaining</span>
                <span className="font-medium text-gray-900">${(budget.amount - budget.spent).toLocaleString()}</span>
              </div>
              {isExceeding && (
                <div className="flex items-start gap-2 p-4 text-sm bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <p>
                    You have exceeded your {budget.period} budget
                    {budget.category ? ` for ${budget.category}` : ''}!
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </CustomCard>
  );
}