package com.margelo.nitro.bluetoothstatemanager

import android.annotation.SuppressLint
import android.app.Activity
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.provider.Settings
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.margelo.nitro.NitroModules
import com.margelo.nitro.core.Promise

class BluetoothStateManager : HybridBluetoothStateManagerSpec() {
  override val memorySize: Long
    get() = 5

  private var bluetoothAdapter: BluetoothAdapter? = null

  private fun getBluetoothAdapter(): BluetoothAdapter? {
    if (this.bluetoothAdapter != null) {
      return this.bluetoothAdapter
    }

    val bluetoothManager: BluetoothManager =
      getContext().getSystemService(BluetoothManager::class.java)
    this.bluetoothAdapter = bluetoothManager.adapter
    return this.bluetoothAdapter
  }

  private val broadCastReceiver = object : BroadcastReceiver() {
    override fun onReceive(contxt: Context?, intent: Intent?) {
      when (intent?.action) {
        BluetoothAdapter.ACTION_STATE_CHANGED -> {
          val state = intent.getIntExtra(BluetoothAdapter.EXTRA_STATE, BluetoothAdapter.ERROR)
          for (listener in listeners) {
            listener(fromBluetoothState(state))
          }
        }
      }
    }
  }

  private fun startListenForBluetoothStateChange() {
    val filter = IntentFilter(BluetoothAdapter.ACTION_STATE_CHANGED)
    getContext().registerReceiver(
      this.broadCastReceiver,
      filter
    )
  }

  private fun stopListenForBluetoothStateChange() {
    getContext().unregisterReceiver(
      this.broadCastReceiver,
    )
  }

  private fun getCurrentState(): BluetoothState {
    val adapter = this.getBluetoothAdapter() ?: return BluetoothState.UNSUPPORTED
    return this.fromBluetoothState(adapter.state)
  }

  override fun getState(): Promise<BluetoothState> {
    return Promise.async {
        return@async getCurrentState()
    }
  }

  override fun getStateSync(): BluetoothState {
    return getCurrentState()
  }

  private fun fromBluetoothState(state: Int?): BluetoothState {
    return when (state) {
      BluetoothAdapter.STATE_ON -> BluetoothState.POWEREDON
      BluetoothAdapter.STATE_OFF -> BluetoothState.POWEREDOFF
      BluetoothAdapter.STATE_TURNING_OFF, BluetoothAdapter.STATE_TURNING_ON -> BluetoothState.RESETTING
      else -> BluetoothState.UNKNOWN
    }
  }

  private var listeners = mutableListOf<(state: BluetoothState) -> Unit>()

  override fun addListener(callback: (state: BluetoothState) -> Unit): Double {
    if (this.listeners.size == 0) {
      this.startListenForBluetoothStateChange()
    }

    this.listeners.add(callback)
    return this.listeners.size.toDouble() - 1
  }

  override fun removeListener(index: Double) {
    this.listeners.removeAt(index.toInt())
    if (this.listeners.size == 0) {
      this.stopListenForBluetoothStateChange()
    }
  }

  fun getContext(): ReactApplicationContext {
    return NitroModules.applicationContext!!
  }

  fun getCurrentActivity(): Activity {
    return getContext().currentActivity!!
  }

  private val INTENT_OPEN_BLUETOOTH_SETTINGS = Intent(
    Settings.ACTION_BLUETOOTH_SETTINGS
  )

  override fun openSettings(): Promise<Unit> {
    return Promise.async {
      getCurrentActivity().startActivity(
        INTENT_OPEN_BLUETOOTH_SETTINGS
      )
    }
  }

  private val REQUEST_ENABLE_BT: Int = 795
  private val INTENT_REQUEST_ENABLE_BLUETOOTH = Intent(
    BluetoothAdapter.ACTION_REQUEST_ENABLE
  )
  private val INTENT_REQUEST_DISABLE_BLUETOOTH = Intent("android.bluetooth.adapter.action.REQUEST_DISABLE");

  @SuppressLint("MissingPermission")
  override fun requestToEnable(): Promise<Unit> {
    val promise = Promise<Unit>()

    try {
      val requestToEnableListener = object : BaseActivityEventListener() {
        override fun onActivityResult(
          activity: Activity,
          requestCode: Int,
          resultCode: Int,
          intent: Intent?,
        ) {
          if (requestCode != REQUEST_ENABLE_BT) {
            return
          }

          if (resultCode == Activity.RESULT_CANCELED) {
            promise.reject(Error("The user canceled the action."))
          } else if (resultCode == Activity.RESULT_OK) {
            promise.resolve(Unit)
          } else {
            promise.reject(Error("Unknown"))
          }
          getContext().removeActivityEventListener(this)
        }
      }

      getContext().addActivityEventListener(requestToEnableListener)
      getCurrentActivity().startActivityForResult(
        INTENT_REQUEST_ENABLE_BLUETOOTH,
        REQUEST_ENABLE_BT
      )
    } catch (error: Exception) {
      promise.reject(error)
    }

    return promise
  }

  override fun requestToDisable(): Promise<Unit> {
    val promise = Promise<Unit>()

    try {
      val requestToEnableListener = object : BaseActivityEventListener() {
        override fun onActivityResult(
          activity: Activity,
          requestCode: Int,
          resultCode: Int,
          intent: Intent?,
        ) {
          if (requestCode != REQUEST_ENABLE_BT) {
            return
          }

          if (resultCode == Activity.RESULT_CANCELED) {
            promise.reject(Error("The user canceled the action."))
          } else if (resultCode == Activity.RESULT_OK) {
            promise.resolve(Unit)
          } else {
            promise.reject(Error("Unknown"))
          }
          getContext().removeActivityEventListener(this)
        }
      }

      getContext().addActivityEventListener(requestToEnableListener)
      getCurrentActivity().startActivityForResult(
        INTENT_REQUEST_DISABLE_BLUETOOTH,
        REQUEST_ENABLE_BT
      )
    } catch (error: Exception) {
      promise.reject(error)
    }

    return promise
  }
}
