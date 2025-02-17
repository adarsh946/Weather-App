import type { ForecastData } from "@/config/types";
import { format, nextDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface IWeatherForecast {
  data: ForecastData;
}

interface IDailyForecast {
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  date: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

function WeatherForecast({ data }: IWeatherForecast) {
  const dailyForecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        date: forecast.dt,
        weather: forecast.weather[0],
      };
    } else {
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
      acc[date].temp_min = Math.max(acc[date].temp_min, forecast.main.temp_min);
    }
    return acc;
  }, {} as Record<string, IDailyForecast>);

  // getting data for 5 days and making the dailyforecast array..
  const newDays = Object.values(dailyForecast).slice(1, 6);

  //Format temperture
  const tempFormat = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Days Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {newDays.map((day) => (
            <div
              key={day.date}
              className="rounded-lg border p-4 items-center grid grid-cols-3"
            >
              <div>
                <p className="font-medium">
                  {" "}
                  {format(new Date(day.date * 1000), "EEE MMM dd")}{" "}
                </p>
                <p className="text-sm capitalize text-muted-foreground">
                  {" "}
                  {day.weather.description}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  {tempFormat(day.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {tempFormat(day.temp_max)}
                </span>
              </div>
              <div className="flex gap-4 justify-end">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm"> {day.humidity}% </span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm"> {day.wind} m/s </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherForecast;
