"use client";

import { Button } from "./CustomButton";
import { PlusCircle, Download, Settings } from "lucide-react";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { GenerateReportDialog } from "./GenerateReportDialog";
import { SetBudgetDialog } from "./SetBudgetDialog";
import { useState } from "react";

export function WalletHeader() {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wallet Dashboard</h1>
        <p className="text-muted-foreground">
          Track and manage your finances across all accounts
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => setIsTransactionDialogOpen(true)}
          className="gap-2"
          // size="sm"
        >
          <PlusCircle className="h-4 w-4" />
          Add Transaction
        </Button>
        <Button 
          onClick={() => setIsReportDialogOpen(true)}
          variant="outline" 
          // size="sm" 
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Generate Report
        </Button>
        <Button
          onClick={() => setIsBudgetDialogOpen(true)}
          variant="outline"
          // size="sm"
          className="gap-2"
        >
          <Settings className="h-4 w-4" />
          Set Budget
        </Button>
      </div>
      <AddTransactionDialog open={isTransactionDialogOpen} setOpen={setIsTransactionDialogOpen} />
      <GenerateReportDialog open={isReportDialogOpen} setOpen={setIsReportDialogOpen} />
      <SetBudgetDialog open={isBudgetDialogOpen} setOpen={setIsBudgetDialogOpen} />
    </div>
  );
}