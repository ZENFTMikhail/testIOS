import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';

type Driver = {
  driverId: string;
  givenName: string;
  familyName: string;
  nationality: string;
  dateOfBirth: string;
};

type APIResponse = {
  MRData: {
    DriverTable: {
      Drivers: Driver[];
    };
    total: string;
  };
};

const DRIVERS_PER_PAGE = 30;

const FetchDriver: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchDrivers = async (pageIndex: number) => {
    setLoading(true);
    setError(null);
    try {
      const offset = pageIndex * DRIVERS_PER_PAGE;
      const response = await fetch(
        `https://ergast.com/api/f1/drivers.json?limit=${DRIVERS_PER_PAGE}&offset=${offset}`
      );
      const data: APIResponse = await response.json();
      setDrivers(data.MRData.DriverTable.Drivers);
      setTotal(parseInt(data.MRData.total, 10));
    } catch (err) {
      setError('Не удалось загрузить данные.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers(page);
  }, [page]);

  const renderItem = ({ item }: { item: Driver }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>
        {item.givenName} {item.familyName}
      </Text>
      <Text style={styles.cell}>{item.nationality}</Text>
      <Text style={styles.cell}>{item.dateOfBirth}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список гонщиков F1</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <FlatList
            data={drivers}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              `${item.driverId}-${index}`
            }
            ListEmptyComponent={<Text>Нет данных</Text>}
          />

          <View style={styles.pagination}>
            <Button
              title="Назад"
              onPress={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
            />
            <Text style={styles.pageInfo}>
              Страница {page + 1} из {Math.ceil(total / DRIVERS_PER_PAGE)}
            </Text>
            <Button
              title="Вперёд"
              onPress={() => {
                if ((page + 1) * DRIVERS_PER_PAGE < total) {
                  setPage((p) => p + 1);
                }
              }}
              disabled={(page + 1) * DRIVERS_PER_PAGE >= total}
            />
          </View>
        </>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default FetchDriver;
