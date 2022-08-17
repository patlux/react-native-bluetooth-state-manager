import { EventSubscription } from 'react-native';

declare module 'react-native-bluetooth-state-manager' {
  type BluetoothState =
    | 'Unknown'
    | 'Resetting'
    | 'Unsupported'
    | 'Unauthorized'
    | 'PoweredOff'
    | 'PoweredOn';

  function getState(): Promise<BluetoothState>;
  function onStateChange(
    listener: (bluetoothState: BluetoothState) => void,
    emitCurrentState: boolean
  ): EventSubscription;
  function openSettings(): Promise<null>;
  function requestToEnable(): Promise<Boolean>;
  function enable(): Promise<null>;
  function disable(): Promise<null>;
}
