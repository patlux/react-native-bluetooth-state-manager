import RNBluetoothStateManager, { EventEmitter } from './RNBluetoothStateManager';

const BluetoothStateManager = {
  EVENT_BLUETOOTH_STATE_CHANGE: RNBluetoothStateManager.EVENT_BLUETOOTH_STATE_CHANGE,
  addEventListener: (name, callback) => {
    const subscription = EventEmitter.addListener(name, callback);
    return {
      remove: subscription.remove.bind(subscription),
    };
  },
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
