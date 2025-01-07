import { FetchOpenWeatherApiConfig } from "@/types/api";

const BACKEND_API_URL = process.env.EXPO_PUBLIC_BACKEND_API;
const OPEN_WEATHER_API_URL = process.env.EXPO_PUBLIC_OPEN_WEATHER_API;

if (!BACKEND_API_URL || !OPEN_WEATHER_API_URL) {
    throw new Error("Missing environment variables");
}

const fetchApi = async (baseUrl: string, query: string) => {
    const res = await fetch(
      `${baseUrl}/${query}`,
    );
  
    if (!res.ok) {
      throw await res.json();
    }
  
    return await res.json();
}

export const fetchBackendApi = async (query: string) => {
    return fetchApi(BACKEND_API_URL, query);
}

export const fetchOpenWeatherApi = (query: string, config?: FetchOpenWeatherApiConfig) => {
    return config?.isImage ? `${OPEN_WEATHER_API_URL}/${query}` : fetchApi(OPEN_WEATHER_API_URL, query);
}
