import type { GeocodingResponse, WeatherData } from "@/config/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface ICurrentWeather {
  data: WeatherData;
  location?: GeocodingResponse;
}

function CurrentWeather({ data, location }: ICurrentWeather) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const tempFormat = (temp: number) => `${Math.round(temp)}°`;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <h2 className="text-2xl font-bold tracking-tight">
                  {location?.name}
                </h2>
                {location?.state && (
                  <span className="text-muted-foreground">
                    , {location.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {location?.country}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-7xl tracking-tighter font-bold">
                {tempFormat(temp)}
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {tempFormat(feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center text-blue-600">
                    <ArrowUp className="h-3 w-3" />
                    {tempFormat(temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowDown className="h-3 w-3" />
                    {tempFormat(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium ">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium ">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">
                    {tempFormat(speed)} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className=" relative w-full max-w-[200px] flex items-center aspect-square justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CurrentWeather;
