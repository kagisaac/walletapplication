"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./CustomDialog";
import { Button } from "./CustomButton";
import { Input } from "./CustomInput";
import { Select, SelectItem } from "./CustomSelect";
import { useWallet } from "@/lib/wallet-context";
import { X } from "lucide-react";

interface AddTransactionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddTransactionDialog({ open, setOpen }: AddTransactionDialogProps) {
  const { addTransaction, categories } = useWallet();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!amount) newErrors.amount = "Amount is required";
    else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!category) newErrors.category = "Category is required";
    if (!account) newErrors.account = "Account is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      subcategory,
      account,
      note
    });
    
    // Reset form
    setType("expense");
    setCategory("");
    setSubcategory("");
    setAmount("");
    setAccount("");
    setNote("");
    setErrors({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <button 
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>
        <div className="p-6 pt-2 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Transaction Type
            </label>
            <Select 
              value={type} 
              onValueChange={(value) => setType(value as "income" | "expense")}
              placeholder="Select type"
            >
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Select 
              value={category} 
              onValueChange={setCategory}
              placeholder="Select category"
            >
              {Object.keys(categories).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          {category && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Subcategory
              </label>
              <Select 
                value={subcategory} 
                onValueChange={setSubcategory}
                placeholder="Select subcategory"
              >
                {categories[category].map((subcat) => (
                  <SelectItem key={subcat} value={subcat}>
                    {subcat}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Account
            </label>
            <Select 
              value={account} 
              onValueChange={setAccount}
              placeholder="Select account"
            >
              <SelectItem value="bank">Bank Account</SelectItem>
              <SelectItem value="mobile">Mobile Money</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </Select>
            {errors.account && (
              <p className="text-sm text-red-500">{errors.account}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <Input
              placeholder="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Transaction
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}