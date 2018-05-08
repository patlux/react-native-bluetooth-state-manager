package de.patwoz.rn.bluetoothstatemanager;

import android.bluetooth.BluetoothAdapter;

public final class BridgeUtils {

  public static String fromBluetoothState(int bluetoothState) {
    switch (bluetoothState) {
      case BluetoothAdapter.STATE_ON:
        return Constants.BluetoothState.POWERED_ON;
      case BluetoothAdapter.STATE_OFF:
        return Constants.BluetoothState.POWERED_OFF;
      case BluetoothAdapter.STATE_TURNING_OFF:
      case BluetoothAdapter.STATE_TURNING_ON:
        return Constants.BluetoothState.RESETTING;
      default:
        return Constants.BluetoothState.UNKNOWN;
    }
  }

}
