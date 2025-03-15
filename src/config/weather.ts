import { config } from "./config";
import {
  Coordinates,
  ForecastData,
  GeocodingResponse,
  WeatherData,
} from "./types";

class WeatherApi {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: config.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getWeatherData({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl(`${config.BASEURL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });

    return this.fetchData<WeatherData>(url);
  }

  async getWeatherForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${config.BASEURL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });

    return this.fetchData<ForecastData>(url);
  }
  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${config.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }

  async searchLocation(query: string): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${config.GEO}/direct`, {
      q: query,
      limit: 5,
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }
}

export const weatherApi = new WeatherApi();

// class weatherData {
//   private createUrl(endpoint: string, params: Record<string, string | number>) {
//     const searchParams = new URLSearchParams({
//       apiId: config.API_KEY,
//       ...params,
//     });
//     return `${endpoint}?${searchParams.toString()}`;
//   }

//   private async fetchData<T>(url: string): Promise<T> {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("not found");
//     }
//     return response.json();
//   }

//   async getWeatherData({ lat, lon }: Coordinates): Promise<WeatherData> {
//     const url = this.createUrl(`${config.BASEURL}/weather`, {
//       lat: lat.toString(),
//       lon: lon.toString(),
//       units: "metric",
//     });
//     return this.fetchData<WeatherData>(url);
//   }

//   async getWeatherForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
//     const url = this.createUrl(`${config.BASEURL}/forecast`, {
//       lat: lat.toString(),
//       lon: lon.toString(),
//       units: "metric",
//     });

//     return this.fetchData<ForecastData>(url);
//   }

//   async getWeatherQuery(query: string): Promise<GeocodingResponse> {
//     const url = this.createUrl(`${config.GEO}/direct`, {
//       q: query,
//       limit: 5,
//     });
//     return this.fetchData<GeocodingResponse>(url);
//   }
// }
