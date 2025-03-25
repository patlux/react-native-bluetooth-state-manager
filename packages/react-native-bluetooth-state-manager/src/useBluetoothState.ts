import { useSyncExternalStore } from 'react'
import { BluetoothStateManager } from './BluetoothStateManager'

export const useBluetoothState = () => {
  return useSyncExternalStore(
    (cb) => {
      const remove = BluetoothStateManager.addListener(cb)
      return remove
    },
    () => BluetoothStateManager.getStateSync(),
  )
}
