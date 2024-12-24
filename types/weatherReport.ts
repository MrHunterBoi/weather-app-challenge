import { Unit } from "@/types/measure";

// OpenWeatherAPI weather report data
export interface IWeatherReport {
  name: string; // City
  id: number; // City id
  weather: {
    main: string; // Weather summary
    description: string; // Weather desc
    icon: string; // Weather icon id
  }[];
  main: {
    temp: number; // C/F
    feels_like: number; // C/F
    pressure: number; // hPa
    humidity: number; // %
  };
  wind: {
    speed: number; // M/s or Mi/h
    deg: number; // Deg
    gust: number; // M/s or Mi/h
  };
  clouds: {
    all: number; // %
  };
  measurement: Unit;
}


