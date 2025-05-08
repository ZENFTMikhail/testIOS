import { configureStore } from '@reduxjs/toolkit';
import driverReducer from './drivers/reducer';


const store = configureStore({
  reducer: {
    drivers: driverReducer ,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
