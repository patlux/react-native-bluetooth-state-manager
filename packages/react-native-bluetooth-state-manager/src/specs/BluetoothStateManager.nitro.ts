import { type HybridObject } from 'react-native-nitro-modules'

export type BluetoothState =
  | 'PoweredOn'
  | 'PoweredOff'
  | 'Unauthorized'
  | 'Unsupported'
  | 'Resetting'
  | 'Unknown'

export interface BluetoothStateManager
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  getState(): Promise<BluetoothState>
  getStateSync(): BluetoothState
  addListener(callback: (state: BluetoothState) => void): number
  removeListener(index: number): void
  openSettings(): Promise<void>
  requestToEnable(): Promise<void>
  requestToDisable(): Promise<void>
}
