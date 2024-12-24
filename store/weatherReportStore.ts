import { IWeatherReport } from '@/types/weatherReport';
import { create } from 'zustand';

// Storing all recent reports and currently selected weather report
interface IWeatherReportStore {
  selectedWeatherReport: IWeatherReport | null;
  selectWeatherReport: (report: IWeatherReport) => void;
}

export const useWeatherStore = create<IWeatherReportStore>(set => ({
  selectedWeatherReport: null,
  selectWeatherReport: report => set({ selectedWeatherReport: report }),
}));
