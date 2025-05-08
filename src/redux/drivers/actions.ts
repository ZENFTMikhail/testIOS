import axios from 'axios';
import { AppDispatch } from '../store';
import { fetchDriversStart, fetchDriversSuccess, fetchDriversFailure} from './reducer';

export const fetchDrivers =
  (page = 0, limit = 30) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchDriversStart());
      const offset = page * limit;
      const res = await axios.get(
        `https://ergast.com/api/f1/drivers.json?limit=${limit}&offset=${offset}`
      );
      const data = res.data.MRData;
      dispatch(fetchDriversSuccess({
        drivers: data.DriverTable.Drivers,
        total: parseInt(data.total, 10),
      }));
    } catch (err: any) {
      dispatch(fetchDriversFailure(err.message));
    }
  };
