import { NativeModules, NativeEventEmitter } from 'react-native';
const { RNBluetoothStateManager } = NativeModules;

if (!RNBluetoothStateManager && __DEV__) {
  const logMessage = console.warn || console.log;
  logMessage('react-native-bluetooth-state-manager module is not correctly linked');
}

const EventEmitter = new NativeEventEmitter(RNBluetoothStateManager || {});

export { EventEmitter };
export default RNBluetoothStateManager;
