import CurrentWeather from "@/components/currentWeather";
import FavouriteCities from "@/components/favouriteCities";
import HourlyTemperature from "@/components/HourlyTemperature";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useGeoLocation } from "@/hooks/useGeolocation";
import {
  useForecastQuery,
  useLocationQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";

function Dashboard() {
  const {
    coordinates,
    isLoading: locationLoading,
    error: locationError,
    geoLocation,
  } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const locationQuery = useLocationQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    geoLocation();
    if (coordinates) {
      weatherQuery.refetch();
      locationQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>{locationError}</AlertDescription>
        <Button variant={"outline"} onClick={geoLocation} className="w-fit">
          <MapPin className="mr-4 h-4 w-4" />
          Enable Location
        </Button>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 ">
          Please enable the location permission to see the weather of your
          location.
        </AlertDescription>
        <Button variant={"outline"} onClick={geoLocation} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to Fetch the data. Please try again.</p>
        </AlertDescription>
        <Button
          variant={"outline"}
          onClick={handleRefresh}
          className="w-fit"
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw className="mr-4 h-4 w-4" />
          Enable Location
        </Button>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return;
  }

  return (
    <div className="space-y-4">
      <FavouriteCities />

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} location={locationName} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
