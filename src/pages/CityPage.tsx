import CurrentWeather from "@/components/currentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";

import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import FavouriteButton from "@/components/favouriteButton";

function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to Fetch the data. Please try again.</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {weatherQuery.data?.name}, {weatherQuery.data?.sys.country}
        </h1>
        <div>
          <FavouriteButton
            data={{ ...weatherQuery.data, name: params.cityName || "" }}
          />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col  gap-4">
          {weatherQuery.data && <CurrentWeather data={weatherQuery.data} />}
          {forecastQuery.data && (
            <HourlyTemperature data={forecastQuery.data} />
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {weatherQuery.data && <WeatherDetails data={weatherQuery.data} />}
          {forecastQuery.data && <WeatherForecast data={forecastQuery.data} />}
        </div>
      </div>
    </div>
  );
}

export default CityPage;
