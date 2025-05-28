import { NitroModules } from 'react-native-nitro-modules'

export { type BluetoothState } from './specs/BluetoothStateManager.nitro'
import type {
  BluetoothState,
  BluetoothStateManager as RNBluetoothStateMangerSpec,
} from './specs/BluetoothStateManager.nitro'

const module = NitroModules.createHybridObject<RNBluetoothStateMangerSpec>(
  'BluetoothStateManager',
)

type Module = Omit<
  typeof module,
  'addListener' | 'removeListener' | 'equals' | 'name'
> & {
  addListener: (
    callback: (state: BluetoothState) => void,
    emitCurrentState?: boolean,
  ) => () => void
}

export const BluetoothStateManager: Module = {
  getState: () => module.getState(),
  getStateSync: () => module.getStateSync(),
  /**
   * Opens the bluetooth settings page
   */
  openSettings: () => module.openSettings(),
  /**
   * Get called whenever the bluetooth state changes
   */
  addListener: (callback, emitCurrentState = true) => {
    if (emitCurrentState) {
      callback(module.getStateSync())
    }
    const callbackRef = module.addListener(callback)
    return () => {
      module.removeListener(callbackRef)
    }
  },
  /**
   * Requests the user to enable bluetooth
   */
  requestToEnable: () => module.requestToEnable(),
  /**
   * Requests the user to disable bluetooth
   */
  requestToDisable: () => module.requestToDisable(),
  dispose: () => module.dispose(),
}
