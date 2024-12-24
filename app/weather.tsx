import { getWeatherIconUrl } from '@/api/api';
import { useWeatherStore } from '@/store/weatherReportStore';
import { Unit } from '@/types/measure';
import { toCapitalSentence } from '@/utils/transform';
import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// Wind direcrtions in degrees
const winds = {
  0: 'N',
  45: 'NE',
  90: 'E',
  135: 'SE',
  180: 'S',
  225: 'SW',
  270: 'W',
  315: 'NW',
};

// Units for imperial and metric systems
const imperialUnits = {
    temp: '°F',
    speed: 'mi/h',
}

const metricUnits = {
    temp: '°C',
    speed: 'm/s',
}

export default function WeatherPage() {
  // Getting selected weather report from store
  const { selectedWeatherReport } = useWeatherStore();

  // Checking whether to use imperial or metric system
  const { temp, speed } = useMemo(
    () => (selectedWeatherReport?.measurement === Unit.METRIC ? metricUnits : imperialUnits),
    [selectedWeatherReport?.measurement],
  );

  // Calculating wind direction label by finding lowest delta
  const windDirection = useMemo(
    () =>
      Object.entries(winds).reduce((prev, curr) => {
        if (
          Math.abs(+curr[0] - (selectedWeatherReport?.wind.deg ?? 0)) <
          Math.abs(+prev[0] - (selectedWeatherReport?.wind.deg ?? 0))
        ) {
          return curr;
        }

        return prev;
      })[1],
    [selectedWeatherReport?.wind.deg],
  );

  return (
    <ScrollView
      style={styles.wrapperContainer}
      contentContainerStyle={styles.itemsContainer}
    >
      <Image
        source={{
          uri: getWeatherIconUrl(selectedWeatherReport?.weather[0].icon || '01d'),
          width: 200,
          height: 200,
        }}
      />

      <View>
        <Text style={[styles.text, styles.titleText]}>
          {selectedWeatherReport?.main.temp}
          {temp}
        </Text>

        <Text style={[styles.text, styles.titleText]}>
          {selectedWeatherReport?.weather[0].main}
        </Text>
      </View>

      <View>
        <Text style={[styles.text, styles.normalText]}>
          Description: {toCapitalSentence(selectedWeatherReport?.weather[0].description || '')}
        </Text>

        <Text style={[styles.text, styles.normalText]}>
          Feels like: {selectedWeatherReport?.main.feels_like}
          {temp}
        </Text>

        <Text style={[styles.text, styles.normalText]}>
          Cloud coverage: {selectedWeatherReport?.clouds.all}%
        </Text>

        <Text style={[styles.text, styles.normalText]}>
          Humidity: {selectedWeatherReport?.main.humidity}%
        </Text>

        <Text style={[styles.text, styles.normalText]}>
          Pressure: {selectedWeatherReport?.main.pressure}hPa
        </Text>
      </View>

      <View>
        <Text style={[styles.text, styles.normalText]}>
          Wind direction: {selectedWeatherReport?.wind.deg}°, {windDirection}
        </Text>

        <Text style={[styles.text, styles.normalText]}>
          Wind speed: {selectedWeatherReport?.wind.speed}
          {speed}
        </Text>

        <Text style={[styles.text, styles.normalText]}>
          Wind gust: {selectedWeatherReport?.wind.gust}
          {speed}
        </Text>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  wrapperContainer: {
    width: '100%',
    height: '100%',
    padding: 32,

    backgroundColor: 'white',
  },

  itemsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },

  text: {
    textAlign: 'center',
  },

  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  normalText: {
    fontSize: 16,
  },
});
