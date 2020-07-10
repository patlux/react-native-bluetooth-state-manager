package de.patwoz.rn.bluetoothstatemanager;

import androidx.annotation.StringDef;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

public class Constants {

  @StringDef({
          BluetoothState.UNKNOWN,
          BluetoothState.RESETTING,
          BluetoothState.UNSUPPORTED,
          BluetoothState.UNAUTHORIZED,
          BluetoothState.POWERED_OFF,
          BluetoothState.POWERED_ON}
  )
  @Retention(RetentionPolicy.SOURCE)
  @interface BluetoothState {

    String UNKNOWN = "Unknown";
    String RESETTING = "Resetting";
    String UNSUPPORTED = "Unsupported";
    String UNAUTHORIZED = "Unauthorized";
    String POWERED_OFF = "PoweredOff";
    String POWERED_ON = "PoweredOn";
  }
}
