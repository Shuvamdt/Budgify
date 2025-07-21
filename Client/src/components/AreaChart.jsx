"use client";

import React, { useState, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartConfig = {
  amount: { label: "Amount" },
  debit: { label: "Debit", color: "var(--chart-1)" },
  credit: { label: "Credit", color: "var(--chart-2)" },
};

export function ChartAreaInteractive({ data }) {
  const [timeRange, setTimeRange] = useState("90d");

  const chartData = useMemo(() => {
    if (!data) return [];

    const dailyMap = {};

    data.forEach((entry) => {
      const dateKey = new Date(entry.date).toISOString().split("T")[0];

      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = { date: dateKey, debit: 0, credit: 0 };
      }

      if (entry.amount > 0) {
        dailyMap[dateKey].debit += entry.amount;
      } else if (entry.amount < 0) {
        dailyMap[dateKey].credit += Math.abs(entry.amount);
      }
    });

    return Object.values(dailyMap).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [data]);

  const filteredData = useMemo(() => {
    if (!chartData.length) return [];
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return chartData.filter((item) => new Date(item.date) >= startDate);
  }, [chartData, timeRange]);

  return (
    <Card className="pt-0 bg-[#FAA307] text-[#03071E] w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            <p className="text-[#DC2F02]">
              Showing total debits and credits for the selected time range
            </p>
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="flex-1 aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D00000" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D00000" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6A040F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6A040F" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <YAxis domain={[0, "auto"]} padding={{ top: 20, bottom: 20 }} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="credit"
              type="natural"
              fill="url(#fillMobile)"
              stroke="#6A040F"
              stackId="a"
            />
            <Area
              dataKey="debit"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="#D00000"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
