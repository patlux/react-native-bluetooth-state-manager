import RNBluetoothStateManager, { EventEmitter } from './RNBluetoothStateManager';

/**
 * @typedef {"PoweredOn" | "PoweredOff" | "Unauthorized" | "Unsupported" | "Resetting" | "Unknown"} BleState
 */

/**
 * Returns the current state of the bluetooth service.
 *
 * @returns {Promise<BleState>} Current state of the bluetooth service
 *
 * @example
 *    const bleState = await getState();
 */
function getState() {
  return RNBluetoothStateManager.getState();
}

/**
 * Subscription
 * @typedef {Object} Subscription
 * @property {Function} remove Unsubscribe the listener
 *
 * @example
 *    const subscription = BluetoothStateManager.onStateChange(...);
 *    subscription.remove();
 */

/**
 * Callback with the current bluetooth state.
 *
 * @callback listenerCallback
 * @param {BleState} bleState Current bluetooth state
 *
 */

/**
 * Starts listening to bluetooth state changes.
 *
 * @param {listenerCallback} callback Will be called on bluetooth state changes
 * @param {boolean} [emitCurrentState] Will call the given callback with the current state once
 * @returns {Subscription} Subscription
 */
function onStateChange(callback, emitCurrentState) {
  if (emitCurrentState) {
    BluetoothStateManager.getState().then(
      (bluetoothState) => typeof callback === 'function' && callback(bluetoothState)
    );
  }

  return BluetoothStateManager.addEventListener(
    BluetoothStateManager.EVENT_BLUETOOTH_STATE_CHANGE,
    callback
  );
}

/**
 * Adds a listener to the given event.
 *
 * @param {string} name Name of the event
 * @param {Function} callback
 */
function addEventListener(name, callback) {
  const subscription = EventEmitter.addListener(name, callback);
  return {
    remove: subscription.remove.bind(subscription),
  };
}

/**
 * Enables Bluetooth without further user interaction.
 *
 * Android only
 * Needs the BLUETOOTH_ADMIN permission.
 *
 * @returns {Promise<null>} Will return null if successful
 */
function enable() {
  return RNBluetoothStateManager.enable();
}

/**
 * Disables Bluetooth without further user interaction.
 *
 * Android only
 * Needs the BLUETOOTH_ADMIN permission.
 *
 * @returns {Promise<null>} Will return null if successful
 */
function disable() {
  return RNBluetoothStateManager.disable();
}

/**
 * Shows a dialog that allows the user to turn on Bluetooth.
 *
 * Android only
 *
 * @returns {Promise<null>} Will return null if successful
 */
function requestToEnable() {
  return RNBluetoothStateManager.requestToEnable();
}

/**
 * Opens the bluetooth settings on android and the settings page of the app on iOS.
 *
 * @returns {Promise<null>} Will return null if successful
 */
function openSettings() {
  return RNBluetoothStateManager.openSettings();
}

const BluetoothStateManager = {
  EVENT_BLUETOOTH_STATE_CHANGE: RNBluetoothStateManager.EVENT_BLUETOOTH_STATE_CHANGE,
  getState,
  onStateChange,
  addEventListener,
  enable,
  disable,
  requestToEnable,
  openSettings,
};

export default BluetoothStateManager;
