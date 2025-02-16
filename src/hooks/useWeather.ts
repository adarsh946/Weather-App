import type { Coordinates } from "@/config/types";
import { weatherApi } from "@/config/weather";
import { useQuery } from "@tanstack/react-query";

const WEATHER_KEY = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
} as const;

export const useWeatherQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEY.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getWeatherData(coordinates) : null,
    enabled: !!coordinates,
  });
};

export const useForecastQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getWeatherForecast(coordinates) : null,
    enabled: !!coordinates,
  });
};

export const useLocationQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
};
