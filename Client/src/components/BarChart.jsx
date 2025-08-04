"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
import { useEffect, useMemo, useState } from "react";

export const description = "A bar chart with a custom label";

const currentDate = new Date();
const endMonthName = currentDate.toLocaleString("default", { month: "long" });

const startDate = new Date();
startDate.setMonth(currentDate.getMonth() - 2);
const startMonthName = startDate.toLocaleString("default", { month: "long" });

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
};

const month1 = new Date();
month1.setMonth(currentDate.getMonth() - 2);
const month2 = new Date();
month2.setMonth(currentDate.getMonth() - 1);
const month3 = new Date();
month3.setMonth(currentDate.getMonth());

export function ChartBarLabelCustom({ data }) {
  const [month1Exps, setMonth1Exps] = useState(0);
  const [month2Exps, setMonth2Exps] = useState(0);
  const [month3Exps, setMonth3Exps] = useState(0);
  const [month1Credit, setMonth1Credit] = useState(0);
  const [month2Credit, setMonth2Credit] = useState(0);
  const [month3Credit, setMonth3Credit] = useState(0);
  let exp1 = 0,
    exp2 = 0,
    exp3 = 0,
    cr1 = 0,
    cr2 = 0,
    cr3 = 0;
  data.forEach((element) => {
    const currMonth = parseInt(element.date.split("-")[1]) - 1;
    if (currMonth == month1.getMonth()) {
      if (element.amount < 0) {
        cr1 += Math.abs(element.amount);
      } else {
        exp1 += element.amount;
      }
    } else if (currMonth == month2.getMonth()) {
      if (element.amount < 0) {
        cr2 += Math.abs(element.amount);
      } else {
        exp2 += element.amount;
      }
    } else if (currMonth == month3.getMonth()) {
      if (element.amount < 0) {
        cr3 += Math.abs(element.amount);
      } else {
        exp3 += element.amount;
      }
    }
  });
  useEffect(() => {
    setMonth1Exps(exp1.toFixed(2));
    setMonth2Exps(exp2.toFixed(2));
    setMonth3Exps(exp3.toFixed(2));
    setMonth1Credit(cr1.toFixed(2));
    setMonth2Credit(cr2.toFixed(2));
    setMonth3Credit(cr3.toFixed(2));
  }, [exp1, exp2, exp3, cr1, cr2, cr3]);
  const chartData = useMemo(
    () => [
      {
        month: month1.toLocaleString("default", {
          month: "long",
        }),
        debit: month1Exps,
        credit: month1Credit,
      },
      {
        month: month2.toLocaleString("default", {
          month: "long",
        }),
        debit: month2Exps,
        credit: month2Credit,
      },
      {
        month: month3.toLocaleString("default", {
          month: "long",
        }),
        debit: month3Exps,
        credit: month3Credit,
      },
    ],
    [
      month1Exps,
      month2Exps,
      month3Exps,
      month1Credit,
      month2Credit,
      month3Credit,
    ]
  );
  return (
    <Card className="bg-[#FAA307] text-[#03071E]">
      <CardHeader>
        <CardTitle>Bar Chart - Debit/Credit</CardTitle>
        <CardDescription>
          <p className="text-[#E85D04]">
            {startMonthName} - {endMonthName}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1">
        <ChartContainer config={chartConfig} className="flex-1">
          <BarChart data={chartData} layout="vertical" margin={{ right: 16 }}>
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="credit" type="number" domain={[0, 15000]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Bar dataKey="credit" layout="vertical" fill="#370617" radius={4}>
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={6}
                className="fill-[#DC2F02]"
                fontSize={12}
              />
              <LabelList
                dataKey="credit"
                position="right"
                offset={50}
                className="fill-[#DC2F02]"
                fontSize={12}
              />
            </Bar>
            <XAxis dataKey="debit" type="number" domain={[0, 15000]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="debit" layout="vertical" fill="#D00000" radius={4}>
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={6}
                className="fill-[#370617]"
                fontSize={12}
              />
              <LabelList
                dataKey="debit"
                position="right"
                offset={50}
                className="fill-[#6A040F]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          <p className="text-[#E85D04]">
            Showing total debits and credits for the last 3 months
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
