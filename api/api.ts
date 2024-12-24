import { Unit } from '@/types/measure';
import { IWeatherReport } from '@/types/weatherReport';

const OPEN_WEATHER_URL = process.env.EXPO_PUBLIC_OPEN_WEATHER_URL;
const OPEN_WEATHER_URL_ICONS = process.env.EXPO_PUBLIC_OPEN_WEATHER_URL_ICONS;
const OPEN_WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;

// Get weather in city
export const getWeather = async (
  city: string,
  units: Unit = Unit.METRIC,
): Promise<IWeatherReport | { message: string }> => {
  const res = await fetch(
    `${OPEN_WEATHER_URL}/data/2.5/weather?q=${city}&units=${units}&appid=${OPEN_WEATHER_API_KEY}`,
  );

  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();

  return {
    ...data,
    measurement: units,
  };
};

// Get weather icon
export const getWeatherIconUrl = (icon: string) => {
  return `${OPEN_WEATHER_URL_ICONS}/img/wn/${icon}@2x.png`;
};
