import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks/useDispatch';
import { fetchDrivers } from '../redux/drivers/actions';


const DRIVERS_PER_PAGE = 30;

const DriverList: React.FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const { list, loading, total } = useAppSelector((state) => state.drivers);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchDrivers(page, DRIVERS_PER_PAGE));
  }, [page, dispatch]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => navigation.navigate('DriverDetails', (item))}>
    <View style={styles.row}>
      <Text style={styles.cell}>{item.givenName} {item.familyName}</Text>
      <Text style={styles.cell}>{item.nationality}</Text>
      <Text style={styles.cell}>{item.dateOfBirth}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список гонщиков F1</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.driverId}-${index}`}
          />

          <View style={styles.pagination}>
            <Button title="Назад" onPress={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} />
            <Text style={styles.pageInfo}>
              Страница {page + 1} из {Math.ceil(total / DRIVERS_PER_PAGE)}
            </Text>
            <Button
              title="Вперёд"
              onPress={() => {
                if ((page + 1) * DRIVERS_PER_PAGE < total) {setPage((p) => p + 1);}
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
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: { flex: 1, fontSize: 14 },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageInfo: { fontSize: 16, fontWeight: 'bold' },

});

export default DriverList;
