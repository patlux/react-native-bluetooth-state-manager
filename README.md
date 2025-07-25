# react-native-bluetooth-state-manager

[![npm version](https://badge.fury.io/js/react-native-bluetooth-state-manager.svg)](https://badge.fury.io/js/react-native-bluetooth-state-manager)

The only purpose of this library is to manage the Bluetooth state. Not more, not less.

If you need further functionality like connecting and communicating with a device, please look at [react-native-ble-plx](https://github.com/Polidea/react-native-ble-plx).

## Table Of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [API](#api)

## Installation

Requires react-native `>=0.75`. See also the requirements of [react-native-nitro-modules](https://nitro.margelo.com/docs/minimum-requirements).

```shell
bun add react-native-nitro-modules react-native-bluetooth-state-manager
cd ios && bunx pod-install

# replace bun with npm/yarn/pnpm and bunx with npx
```

## Setup

```tsx
import { BluetoothStateManager } from "react-native-bluetooth-state-manager";
```

**iOS**

You must provide a short description of why you need access to Bluetooth in your app. Otherwise, your app will crash when requesting Bluetooth access:

```
This app has crashed because it attempted to access privacy-sensitive data without a usage description.  The app's Info.plist must contain an NSBluetoothAlwaysUsageDescription key with a string value explaining to the user how the app uses this data.
```

See: https://developer.apple.com/documentation/bundleresources/information_property_list/nsbluetoothalwaysusagedescription

For expo add the following to your `app.json`/`app.config.js`/`app.config.ts`:

```json
{
  "ios": {
    "infoPlist": {
      "NSBluetoothAlwaysUsageDescription": "Your reason to use bluetooth"
    }
  }
}
```

**Important**: The first attempt to check the Bluetooth state will prompt the user for permission to access Bluetooth.

**Android**

To use `requestToEnable()` and `requestToDisable()` on Android, you have to add the `BLUETOOTH_CONNECT` permission to your `AndroidManifest.xml`:

```diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android">
+    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT"/>
  </manifest>
```

`BLUETOOTH_CONNECT` is a runtime permission, which means you must ask the user at runtime for permission. For that, we recommend [react-native-permissions](https://github.com/zoontek/react-native-permissions/tree/master).

## Usage

```tsx
import {
  useBluetoothState,
  BluetoothStateManager,
  BluetoothState,
} from "react-native-bluetooth-state-manager";

// Get bluetooth state

// hook
const bluetoothState = useBluetoothState();
// synchronous
const bluetoothState = BluetoothStateManager.getStateSync();
// asynchronous
const bluetoothState = await BluetoothStateManager.getState();
// Event listener
const [bluetoothState, setBluetoothState] = useState<BluetoothState>();
useEffect(() => {
  const remove = BluetoothStateManager.addListener((state) => {
    setBluetoothState(state);
  });
  return remove;
}, []);

// Open settings page
await BluetoothStateManager.openSettings();

// Android only

// Ask user to enable bluetooth
await BluetoothStateManager.requestToEnable();

// Ask user to disable bluetooth
await BluetoothStateManager.requestToDisable();
```

## API

An example is under `example/App.tsx`

| Method                                                           | Return Type               | OS           | Description                                                      |
| ---------------------------------------------------------------- | ------------------------- | ------------ | ---------------------------------------------------------------- |
| [useBluetoothState(enabled: boolean = true)](#usebluetoothstate) | `BluetoothState`          | Android, iOS | Hook that returns the current state of the bluetooth service.    |
| [getState()](#getstate)                                          | `Promise<BluetoothState>` | Android, iOS | Returns the current state of the bluetooth service.              |
| [getStateSync()](#getstatesync)                                  | `BluetoothState`          | Android, iOS | Returns the current state synchronous of the bluetooth service.  |
| [addListener(listener, emitCurrentState)](#addlistener)          | `Subscription`            | Android, iOS | Listen for bluetooth state changes.                              |
| [openSettings()](#opensettings)                                  | `Promise<null>`           | Android, iOS | Opens the bluetooth settings. Please see below for more details. |
| [requestToEnable()](#requesttoenable)                            | `Promise<void>`           | Android      | Show a dialog that allows the user to turn on Bluetooth.         |
| [requestToDisable()](#requesttodisable)                          | `Promise<void>`           | Android      | Show a dialog that allows the user to turn off Bluetooth.        |

---

### useBluetoothState(enabled: boolean = true)

Hook that returns the current state of the bluetooth service.

```tsx
import { useBluetoothState } from "react-native-bluetooth-state-manager";

const enabled = true; // default true
const bluetoothState = useBluetoothState(enabled);
switch (bluetoothState) {
  case "Unknown":
  case "Resetting":
  case "Unsupported":
  case "Unauthorized":
  case "PoweredOff":
  case "PoweredOn":
  default:
    break;
}
```

### getState()

Returns the current state of the bluetooth service.

```tsx
import { BluetoothStateManager } from "react-native-bluetooth-state-manager";
const bluetoothState = await BluetoothStateManager.getState();
switch (bluetoothState) {
  case "Unknown":
  case "Resetting":
  case "Unsupported":
  case "Unauthorized":
  case "PoweredOff":
  case "PoweredOn":
  default:
    break;
}
```

### getStateSync()

Returns the current state synchronous of the bluetooth service.

```tsx
import { BluetoothStateManager } from "react-native-bluetooth-state-manager";
const bluetoothState = BluetoothStateManager.getStateSync();
switch (bluetoothState) {
  case "Unknown":
  case "Resetting":
  case "Unsupported":
  case "Unauthorized":
  case "PoweredOff":
  case "PoweredOn":
  default:
    break;
}
```

### addListener(listener, emitCurrentState)

Listen for bluetooth state changes.

```tsx
import { BluetoothStateManager } from "react-native-bluetooth-state-manager";
BluetoothStateManager.addListener((bluetoothState) => {
  // do something...
}, true /*=emitCurrentState*/);
```

### openSettings()

##### Android

Opens the bluetooth settings.

Tested:

- Android 6.0.1 (Huawei P8 Lite ALE-L21)
- Android 7.1.1 (Galaxy J5 2016)
- Android 8.0 (Galaxy S8+ SM-G955f)

##### iOS

Opens the settings page of the app. Please see [here](https://developer.apple.com/documentation/uikit/uiapplicationopensettingsurlstring).

```tsx
BluetoothStateManager.openSettings();
```

### requestToEnable()

Show a dialog that allows the user to turn on Bluetooth. More here: [Android documentation](https://developer.android.com/reference/android/bluetooth/BluetoothAdapter.html#ACTION_REQUEST_ENABLE).

- This function is **only** available on **Android**.

```tsx
try {
  await BluetoothStateManager.requestToEnable();
} catch (error) {
  // Failed
}
```

### requestToDisable()

Show a dialog that allows the user to turn off Bluetooth.

- This function is **only** available on **Android**.

```tsx
try {
  await BluetoothStateManager.requestToDisable();
} catch (error) {
  // Failed
}
```

## Why?

##### Why not just use [react-native-ble-plx](https://github.com/Polidea/react-native-ble-plx)?

Because it's too bloated for my needs.

In several of my projects, I've had to integrate various third-party SDKs that communicate with different Bluetooth devices on the native side. The only functionality I needed on the JavaScript side was checking whether Bluetooth was enabled before starting the third-party SDK.
