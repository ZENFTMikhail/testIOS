import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {  useAppSelector } from  '../redux/hooks/useDispatch';


const DriverDetails = ({ route, navigation }: any) => {
  const { driverId } = route.params;
  const driver = useAppSelector((state) =>
    state.drivers.list.find((d) => d.driverId === driverId)
  );
  if (!driver) {return <Text>Драйвер не найден</Text>;}

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {driver.givenName} {driver.familyName}
      </Text>
      <Text style={styles.info}>Дата рождения: {driver.dateOfBirth}</Text>
      <Text style={styles.info}>Национальность: {driver.nationality}</Text>
      <Text style={styles.info}>ID: {driver.driverId}</Text>

        <Button title="Просмотреть все заезды"
        onPress={() => navigation.navigate('DriverResult', {driverId})} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default DriverDetails;
