"use client";
import { useState, useMemo, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with an active sector";

const chartConfig = {
  amount: {
    label: "amount",
  },
  debit: {
    label: "Debit",
    color: "var(--chart-1)",
  },
  credit: {
    label: "Credit",
    color: "var(--chart-2)",
  },
};

const currentDate = new Date();
const endMonthName = currentDate.toLocaleString("default", { month: "long" });

const startDate = new Date();
startDate.setMonth(currentDate.getMonth() - 2);
const startMonthName = startDate.toLocaleString("default", { month: "long" });

export function ChartPieDonutActive({ data }) {
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  useEffect(() => {
    let credits = 0;
    let debits = 0;
    data.forEach((element) => {
      const amt = element.amount;
      if (amt > 0) {
        debits += amt;
      } else {
        credits += Math.abs(amt);
      }
    });
    setTotalDebit(credits);
    setTotalCredit(debits);
  }, [data]);

  const chartData = useMemo(
    () => [
      { type: "Debit", amount: totalCredit, fill: "#6A040F" },
      { type: "Credit", amount: totalDebit, fill: "#D00000" },
    ],
    [totalCredit, totalDebit]
  );
  return (
    <Card className="flex flex-col bg-[#FAA307] text-[#03071E]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Debit/Credit</CardTitle>
        <CardDescription>
          <p className="text-[#E85D04]">
            {startMonthName}-{endMonthName}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="flex-1 mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium"></div>
        <div className="text-muted-foreground leading-none">
          <p className="text-[#E85D04]">
            Showing transaction totals for the last 3 months
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
