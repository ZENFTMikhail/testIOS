import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';

import DriverList from './screens/DriverList';
import DriverDetails from './screens/DriverDetail';
import DriverResult from './screens/DriverResult';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Drivers" component={DriverList} />
          <Stack.Screen name="DriverDetails" component={DriverDetails} />
          <Stack.Screen name="DriverResult" component={DriverResult} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
