import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

type ResultItem = {
  position: string;
  Constructor: { name: string };
  status: string;
  points: string;
  laps: string;
};

type Race = {
  raceName: string;
  season: string;
  round: string;
  Results: ResultItem[];
};

type APIResponse = {
  MRData: {
    RaceTable: {
      Races: Race[];
    };
  };
};

const DriverResult: React.FC = () => {
  const route = useRoute<any>();
  const { driverId } = route.params;
  const [results, setResults] = useState<Race[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverResults = async () => {
        setLoading(true);
        let allResults: Race[] = [];
        let offset = 0;
        const pageSize = 30;
        try {
          while (true) {
            const response = await axios.get<APIResponse>(
              `https://ergast.com/api/f1/drivers/${driverId}/results.json?limit=${pageSize}&offset=${offset}`
            );

            const races = response.data.MRData.RaceTable.Races;
            if (races.length === 0) {break;}

            allResults = [...allResults, ...races];
            offset += pageSize;
          }

          setResults(allResults.reverse());
        } catch (err) {
          console.error(err);
          setError('Ошибка загрузки всех заездов.');
        } finally {
          setLoading(false);
        }
      };

    fetchDriverResults();
  }, [driverId]);

  const renderItem = ({ item }: { item: Race }) => {
    const result = item.Results[0];

    return (
      <View style={styles.card}>
        <Text style={styles.raceTitle}>
          {item.season} — {item.raceName}
        </Text>
        <Text>🏁 Позиция: {result.position}</Text>
        <Text>🏎️ Конструктор: {result.Constructor.name}</Text>
        <Text>📌 Статус: {result.status}</Text>
        <Text>🔄 Кругов: {result.laps}</Text>
        <Text>⭐ Очки: {result.points}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Заезды гонщика: {driverId}</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => `${item.season}-${item.round}-${index}`}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  raceTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default DriverResult;
