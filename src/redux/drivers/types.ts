export type Driver = {
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
    dateOfBirth: string;
  };

  export interface DriversState {
    list: Driver[];
    loading: boolean;
    error: string | null;
  }

  export const FETCH_DRIVERS_REQUEST = 'FETCH_DRIVERS_REQUEST';
  export const FETCH_DRIVERS_SUCCESS = 'FETCH_DRIVERS_SUCCESS';
  export const FETCH_DRIVERS_FAILURE = 'FETCH_DRIVERS_FAILURE';

  interface FetchDriversRequest {
    type: typeof FETCH_DRIVERS_REQUEST;
  }
  interface FetchDriversSuccess {
    type: typeof FETCH_DRIVERS_SUCCESS;
    payload: Driver[];
  }
  interface FetchDriversFailure {
    type: typeof FETCH_DRIVERS_FAILURE;
    payload: string;
  }

  export type DriverActionTypes =
    | FetchDriversRequest
    | FetchDriversSuccess
    | FetchDriversFailure;
