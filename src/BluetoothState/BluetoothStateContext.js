import { createContext } from 'react';

const noop = () => {};

export const INITIAL_STATE = {
  bluetoothState: null,
  openSettings: noop,
  requestToEnable: noop,
  enable: noop,
  disable: noop,
};

export default createContext(INITIAL_STATE);
