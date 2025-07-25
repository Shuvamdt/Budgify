"use client";
import { useEffect, useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

const chartConfig = {
  savings: {
    label: "Savings",
  },
  amount: {
    label: "Amount",
    color: "var(--chart-2)",
  },
};

const currentDate = new Date();
const endMonthName = currentDate.toLocaleString("default", { month: "long" });

const startDate = new Date();
startDate.setMonth(currentDate.getMonth() - 2);
const startMonthName = startDate.toLocaleString("default", { month: "long" });

export function ChartRadialText({ data }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let sum = 0;
    data.forEach((element) => {
      sum -= element.amount;
    });
    setTotal(sum);
  }, [data]);
  const chartData = useMemo(
    () => [{ amount: "Total", savings: Math.abs(total), fill: "#D00000" }],
    [total]
  );
  return (
    <Card className="flex flex-col bg-[#FAA307] text-[#03071E]">
      <CardHeader className="items-center pb-0">
        {total > 0 ? (
          <CardTitle>Radial Chart - Total Savings</CardTitle>
        ) : (
          <CardTitle>Radial Chart - Total Expenses</CardTitle>
        )}
        <CardDescription>
          <p className="text-[#E85D04]">
            {startMonthName} - {endMonthName}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="flex-1 mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-[#E85D04] last:fill-[#FFBA08]"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="savings" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-[#03071E] text-3xl font-bold"
                        >
                          {Math.abs(total).toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-[#6A040F]"
                        ></tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="text-muted-foreground leading-none">
          <p className="text-[#E85D04]">
            Showing total expenditure for the last 3 months
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
