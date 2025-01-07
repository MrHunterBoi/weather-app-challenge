import { fetchBackendApi, fetchOpenWeatherApi } from "@/api/api";
import { Unit } from "@/types/measure";
import { IWeatherReport } from "@/types/weatherReport";

// Get weather in city
export const getWeather = async (
  city: string,
  units: Unit = Unit.METRIC,
): Promise<IWeatherReport | { message: string }> => {
  const data = await fetchBackendApi(
    `weather-report?city=${city}&units=${units}`,
  );

  return {
    ...data,
    measurement: units,
  };
};

// Get weather icon
export const getWeatherIconUrl = (icon: string) => {
  return fetchOpenWeatherApi(`img/wn/${icon}@2x.png`, { isImage: true }) as string;
};