import RNBluetoothStateManager, { EventEmitter } from './RNBluetoothStateManager';

const BluetoothStateManager = {
  EVENT_BLUETOOTH_STATE_CHANGE: RNBluetoothStateManager.EVENT_BLUETOOTH_STATE_CHANGE,
  addEventListener: (name, callback) => EventEmitter.addListener(name, callback),
  getState: () => RNBluetoothStateManager.getState(),
  onStateChange: (callback, emitCurrentState) => {
    if (emitCurrentState) {
      BluetoothStateManager.getState().then(
        (bluetoothState) => typeof callback === 'function' && callback(bluetoothState)
      );
    }
    return BluetoothStateManager.addEventListener(
      BluetoothStateManager.EVENT_BLUETOOTH_STATE_CHANGE,
      callback
    );
  },
  enable: () => RNBluetoothStateManager.enable(),
  disable: () => RNBluetoothStateManager.disable(),
  requestToEnable: () => RNBluetoothStateManager.requestToEnable(),
  openSettings: () => RNBluetoothStateManager.openSettings(),
};

export default BluetoothStateManager;
