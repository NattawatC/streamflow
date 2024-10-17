"use client"

import { LineChart } from "@/components/lineChart"

const chartdata = [
  {
    date: "Jan 23",
    Electricity: 2890,
    Water: 2338,
  },
  {
    date: "Feb 23",
    Electricity: 2756,
    Water: 2103,
  },
  {
    date: "Mar 23",
    Electricity: 3322,
    Water: 2194,
  },
  {
    date: "Apr 23",
    Electricity: 3470,
    Water: 2108,
  },
  {
    date: "May 23",
    Electricity: 3475,
    Water: 1812,
  },
  {
    date: "Jun 23",
    Electricity: 3129,
    Water: 1726,
  },
  {
    date: "Jul 23",
    Electricity: 3490,
    Water: 1982,
  },
  {
    date: "Aug 23",
    Electricity: 2903,
    Water: 2012,
  },
  {
    date: "Sep 23",
    Electricity: 2643,
    Water: 2342,
  },
  {
    date: "Oct 23",
    Electricity: 2837,
    Water: 2473,
  },
  {
    date: "Nov 23",
    Electricity: 2954,
    Water: 3848,
  },
  {
    date: "Dec 23",
    Electricity: 3239,
    Water: 3736,
  },
]

export const WaterGraph = () => (
  <LineChart
    className="h-80 bg-white p-3 rounded-sm"
    data={chartdata}
    index="date"
    categories={["Water"]}
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}`
    }
    onValueChange={(v) => console.log(v)}
    xAxisLabel="Month"
    yAxisLabel="Per Unit"
  />
)