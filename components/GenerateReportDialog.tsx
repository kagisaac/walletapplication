"use client";

import { useState, useRef, useEffect } from "react";
import { useWallet } from "@/lib/wallet-context";
import { format } from "date-fns";
import { Download, Filter, X } from "lucide-react";

interface GenerateReportDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function GenerateReportDialog({ open, setOpen }: GenerateReportDialogProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reportType, setReportType] = useState<string>("all");
  const { transactions, categories } = useWallet();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [open, setOpen]);

  if (!open) return null;

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const matchesType = reportType === "all" || 
                       (reportType === "income" && transaction.type === "income") ||
                       (reportType === "expenses" && transaction.type === "expense") ||
                       (reportType === "category" && transaction.category.toLowerCase() === reportType.toLowerCase());
    
    const matchesDateRange = (!startDate || transactionDate >= startDate) &&
                           (!endDate || transactionDate <= endDate);
    
    return matchesType && matchesDateRange;
  });

  const totals = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      acc.income += transaction.amount;
    } else {
      acc.expenses += transaction.amount;
    }
    return acc;
  }, { income: 0, expenses: 0 });

  const handleExport = () => {
    const csvContent = [
      ["Date", "Type", "Category", "Subcategory", "Amount", "Account", "Note"].join(","),
      ...filteredTransactions.map(t => [
        format(new Date(t.date), "yyyy-MM-dd"),
        t.type,
        t.category,
        t.subcategory,
        t.amount,
        t.account,
        `"${t.note}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-report-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div 
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Transaction Report</h2>
            <button 
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Transactions</option>
                <option value="income">Income Only</option>
                <option value="expenses">Expenses Only</option>
                {Object.keys(categories).map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Account</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {format(new Date(transaction.date), "MMM dd, yyyy")}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                      {transaction.type}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {transaction.subcategory || transaction.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                      {transaction.account}
                    </td>
                    <td className={`px-4 py-3 text-sm text-right ${
                      transaction.type === "expense" ? "text-red-600" : "text-green-600"
                    }`}>
                      {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No transactions found for the selected criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-sm text-gray-600">
                Total Income: <span className="text-green-600">${totals.income.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600">
                Total Expenses: <span className="text-red-600">${totals.expenses.toLocaleString()}</span>
              </div>
              <div className="text-sm font-medium">
                Net: <span className={totals.income - totals.expenses >= 0 ? "text-green-600" : "text-red-600"}>
                  ${(totals.income - totals.expenses).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Close
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}