package de.patwoz.rn.bluetoothstatemanager;

import android.Manifest;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.content.pm.PackageManager;
import androidx.core.content.ContextCompat;

public final class BluetoothUtils {

  public static boolean isBluetoothSupported() {
    return BluetoothAdapter.getDefaultAdapter() != null;
  }

  public static boolean hasBluetoothAdminPermission(Activity activity) {
    return ContextCompat.checkSelfPermission(activity, Manifest.permission.BLUETOOTH_ADMIN) == PackageManager.PERMISSION_GRANTED;
  }

}
