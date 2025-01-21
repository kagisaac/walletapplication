"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useWallet } from "@/lib/wallet-context";
import { useMemo } from "react";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { CustomCard } from "./CustomCard";

interface ChartDataPoint {
  name: string;
  income: number;
  expenses: number;
  net: number;
  startDate: Date;
  endDate: Date;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

export function Overview() {
  const { transactions } = useWallet();

  const chartData = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), i);
      return {
        date: startOfMonth(date),
        name: format(date, "MMM yy"),
      };
    }).reverse();

    const monthlyData = months.reduce<Record<string, ChartDataPoint>>((acc, { date, name }) => {
      acc[name] = {
        name,
        income: 0,
        expenses: 0,
        net: 0,
        startDate: date,
        endDate: endOfMonth(date),
      };
      return acc;
    }, {});

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = format(date, "MMM yy");
      
      if (monthlyData[monthKey]) {
        if (transaction.type === 'income') {
          monthlyData[monthKey].income += transaction.amount;
        } else {
          monthlyData[monthKey].expenses += transaction.amount;
        }
        monthlyData[monthKey].net = monthlyData[monthKey].income - monthlyData[monthKey].expenses;
      }
    });

    return Object.values(monthlyData);
  }, [transactions]);

  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 1000;
    return Math.max(
      ...chartData.flatMap(data => [data.income, data.expenses])
    ) || 1000;
  }, [chartData]);

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-green-600">
              Income: ${payload[0].value.toLocaleString()}
            </p>
            <p className="text-sm text-red-600">
              Expenses: ${payload[1].value.toLocaleString()}
            </p>
            <p className="text-sm font-medium">
              Net: ${(payload[0].value - payload[1].value).toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <CustomCard className="p-6 bg-gradient-to-br from-white to-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-900">Financial Overview</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-indigo-500" />
            <span className="text-sm text-gray-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-500" />
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              domain={[0, maxValue * 1.1]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: "#6366F1" }}
              activeDot={{ r: 6, strokeWidth: 2, fill: "#6366F1" }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#F43F5E"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: "#F43F5E" }}
              activeDot={{ r: 6, strokeWidth: 2, fill: "#F43F5E" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-gray-600">Total Income</p>
          <p className="font-medium text-green-600">
            ${chartData.reduce((sum, data) => sum + data.income, 0).toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-600">Total Expenses</p>
          <p className="font-medium text-red-600">
            ${chartData.reduce((sum, data) => sum + data.expenses, 0).toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-600">Net Balance</p>
          <p className={`font-medium ${
            chartData.reduce((sum, data) => sum + data.net, 0) >= 0 
              ? "text-green-600" 
              : "text-red-600"
          }`}>
            ${chartData.reduce((sum, data) => sum + data.net, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </CustomCard>
  );
}