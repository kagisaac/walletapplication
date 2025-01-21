"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./CustomDialog";
import { Button } from "./CustomButton";
import { Input } from "./CustomInput";
import { Select, SelectItem } from "./CustomSelect";
import { useState } from "react";
import { useWallet } from "@/lib/wallet-context";

interface SetBudgetDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SetBudgetDialog({ open, setOpen }: SetBudgetDialogProps) {
  const { setBudget, categories } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">("monthly");
  const [category, setCategory] = useState<string>("");

  const handleSetBudget = () => {
    if (!amount) return;

    setBudget({
      amount: parseFloat(amount),
      period,
      category: category || undefined,
    });

    setAmount("");
    setCategory("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Budget</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-2 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Budget Amount
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Period
            </label>
            <Select 
              value={period} 
              onValueChange={(value: any) => setPeriod(value)}
              placeholder="Select period"
            >
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category (Optional)
            </label>
            <Select 
              value={category} 
              onValueChange={setCategory}
              placeholder="Select category"
            >
              {Object.keys(categories).map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSetBudget}>Set Budget</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}