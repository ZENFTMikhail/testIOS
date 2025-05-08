import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Driver } from './types';

type DriversState = {
  list: Driver[];
  loading: boolean;
  error: string | null;
  total: number;
};

const initialState: DriversState = {
  list: [],
  loading: false,
  error: null,
  total: 0,
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    fetchDriversStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDriversSuccess(state, action: PayloadAction<{ drivers: Driver[]; total: number }>) {
      state.list = action.payload.drivers;
      state.loading = false;
      state.total =  action.payload.total;
    },
    fetchDriversFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchDriversStart,
  fetchDriversSuccess,
  fetchDriversFailure,
} = driversSlice.actions;

export default driversSlice.reducer;
