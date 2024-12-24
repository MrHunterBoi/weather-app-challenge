import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { getWeather } from '@/api/api';
import UnitButton from '@/components/UnitButton';
import { useWeatherStore } from '@/store/weatherReportStore';
import { Unit } from '@/types/measure';
import { IWeatherReport } from '@/types/weatherReport';
import { toCapitalSentence } from '@/utils/transform';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();

  // Selects weather report in the store
  const { selectWeatherReport } = useWeatherStore();

  // City name query
  const [search, setSearch] = useState('');

  // Error
  const [error, setError] = useState('');

  // Whether the weather data is being fetched
  const [isLoading, setIsLoading] = useState(false);

  // Unit of measurement
  const [unit, setUnit] = useState(Unit.METRIC);

  // Recent reports queries state
  const [reports, setReports] = useState<{ [key: string]: string }>({});

  // Fetch weather report
  const handleSearch = (query: string) => {
    // Checks if the search query is empty
    if (!search) {
      setError('Please type in city name');

      return;
    }

    setIsLoading(true);
    getWeather(query, unit)
      .then(data => {
        // Select report
        const report = data as IWeatherReport;
        selectWeatherReport(report);
        
        // Add report to recent reports
        setReports(rs => {
          rs[report.id] = report.name;
          return rs;
        });
        router.navigate('/weather');
      })
      .catch(e => {
        // Set error message
        setError(toCapitalSentence(e.message));
      })
      .finally(() => setIsLoading(false));
  };

  // Delete error message on text change
  const handleChangeText = (value: string) => {
    if (error) {
      setError('');
    }

    setSearch(value);
  };

  return (
    <ScrollView
      style={styles.box}
      contentContainerStyle={styles.itemWrapper}
    >
      <Text style={styles.title}>Weather Challenge Test</Text>

      <TextInput
        value={search}
        onChangeText={handleChangeText}
        placeholder='City name goes here...'
        style={styles.input}
      />

      <View style={styles.buttons}>
        <UnitButton unit={unit} setUnit={setUnit} />

        <Pressable
          style={styles.button}
          onPress={() => handleSearch(search)}
        >
          <Text style={ styles.buttonText }>Search</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size='large'
          color={unit === Unit.METRIC ? '#e6dd32' : '#33b6bd'}
        />
      ) : (
        <Text style={styles.error}>{error}</Text>
      )}

      {Object.keys(reports).length > 0 && (
        <View>
          <Text style={styles.alreadySearchedTitle}>Already searched cities:</Text>

          <ScrollView contentContainerStyle={styles.reports}>
            {Object.entries(reports).map(([id, name]) => (
              <Pressable
                key={id}
                style={styles.button}
                onPress={() => handleSearch(name)}
              >
                <Text style={styles.report}>{name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
    padding: 32,
    paddingTop: 96,

    backgroundColor: 'white',
  },

  itemWrapper: {
    alignItems: 'center',
    display: 'flex',
    gap: 48,
  },

  input: {
    width: '100%',
    maxWidth: 600,
    padding: 8,

    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
  },

  title: {
    textAlign: 'center',

    fontSize: 36,
    fontWeight: 'bold',
  },

  alreadySearchedTitle: {
    marginBottom: 16,
    textAlign: 'center',

    fontSize: 24,
    fontWeight: 'bold',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },

  button: {
    padding: 8,
    borderRadius: 24,
      
    borderWidth: 2,
    borderColor: 'black',

    minWidth: 100,
  },

  buttonText: {
    textAlign: 'center',
  },

  error: {
    width: '100%',
    textAlign: 'center',

    color: '#b81616',
  },

  reports: {
    gap: 8,
    alignItems: 'center',
    display: 'flex',

    marginBottom: 64,
  },

  report: {
    minWidth: 48,
    textAlign: 'center',
  },
});
