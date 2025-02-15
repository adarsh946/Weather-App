import { config } from "./config";

class WeatherApi {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      apiid: config.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("unable to fetch the data");
    }

    return response.json();
  }

  async getWeatherData() {}
}
