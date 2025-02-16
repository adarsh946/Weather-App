import type { ForecastData } from "@/config/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IForcastData {
  data: ForecastData;
}

function HourlyTemperature({ data }: IForcastData) {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg bg-background shadow-sm border p-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] text-muted-foreground uppercase">
                              Temperature
                            </span>
                            <span className="font-bold ">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] text-muted-foreground uppercase">
                              Feels Like
                            </span>
                            <span className=" font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                dataKey="temp"
                stroke="#2563eb"
                type="monotone"
                strokeWidth={2}
                dot={true}
              />
              <Line
                dataKey="feels_like"
                stroke="#64748b"
                type="monotone"
                strokeWidth={2}
                dot={true}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default HourlyTemperature;
