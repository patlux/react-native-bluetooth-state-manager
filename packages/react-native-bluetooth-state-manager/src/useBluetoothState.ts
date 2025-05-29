import { useSyncExternalStore } from 'react'
import {
  BluetoothStateManager,
  type BluetoothState,
} from './BluetoothStateManager'

export const useBluetoothState = (enabled = true): BluetoothState => {
  if (!enabled) {
    return 'Unknown'
  }

  return useSyncExternalStore(
    (cb) => {
      const remove = BluetoothStateManager.addListener(cb)
      return remove
    },
    () => BluetoothStateManager.getStateSync(),
  )
}
