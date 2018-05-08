# react-native-bluetooth-state-manager

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

The only purpose of this library is to manage the Bluetooth state. Not more, not less.

If you need further functionality like connecting and communicating to a device, please look at [react-native-ble-plx](https://github.com/Polidea/react-native-ble-plx).

## Why?

##### Why not just using [react-native-ble-plx](https://github.com/Polidea/react-native-ble-plx)?

Because it's to over bloated for my purpose.
In several of my projects I'm working on, I had to integrate several third-party SDK which communicates with different bluetooth devices (on the native side). So the only functionality I needed there (on the javascript side), was to check if the bluetooth is enabled to start the third-party SDK.

## Features

* [Manage bluetooth state](#getstate)
* [Open bluetooth settings page of the OS](#opensettings)
* [Declarative API](#declarative-api)

## Installation

Using [Yarn](https://yarnpkg.com/): (recommended)

```shell
yarn add react-native-bluetooth-state-manager
```

Using [npm](https://www.npmjs.com/):

```shell
npm install react-native-bluetooth-state-manager --save
```

## Linking

### Automatic

Run `react-native link react-native-bluetooth-state-manager`

### Manual

#### iOS

##### With cocoapods

Append the following lines to your `ios/Podfile`:

```diff
target '<your-project>' do
  ...
+ pod 'RNBluetoothStateManager', :path => '../node_modules/react-native-bluetooth-state-manager'
end
```

##### Without cocoapods

1.  In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2.  Go to `node_modules` ➜ `react-native-bluetooth-state-manager` and add `RNBluetoothStateManager.xcodeproj`
3.  In XCode, in the project navigator, select your project. Add `libRNBluetoothStateManager.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4.  Run your project (`Cmd+R`)<

#### Android

##### Manually

1.  in `android/settings.gradle`:

```diff
...
include ':app'
+ include ':react-native-bluetooth-state-manager'
+ project(':react-native-bluetooth-state-manager').projectDir = new File(rootProject.projectDir,   '../node_modules/react-native-bluetooth-state-manager/android')
```

2.  in `android/app/build.gradle`:

```diff
dependencies {
+  compile project(':react-native-bluetooth-state-manager')
  ...
  compile "com.facebook.react:react-native:+"  // From node_modules
}
```

3.  in `android/app/src/main/java/[...]/MainApplication.java`

```diff
+ import de.patwoz.rn.bluetoothstatemanager.RNBluetoothStateManagerPackage;

public class MainApplication extends Application implements ReactApplication {
  // ...

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
+         new RNBluetoothStateManagerPackage()
      );
    }
  };

}
```

## Usage

```javascript
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
```

## API

An example you will find in `example/app/ExampleWithApi.js`

| Method                                                      | Return Type               | OS           | Description                                                      |
| ----------------------------------------------------------- | ------------------------- | ------------ | ---------------------------------------------------------------- |
| [getState()](#getstate)                                     | `Promise<BluetoothState>` | Android, iOS | Returns the current state of the bluetooth service.              |
| [onStateChange(listener, emitCurrentState)](#onstatechange) | `Subscription`            | Android, iOS | Listen for bluetooth state changes.                              |
| [openSettings()](#opensettings)                             | `Promise<null>`           | Android, iOS | Opens the bluetooth settings. Please see below for more details. |
| [requestToEnable()](#requesttoenable)                       | `Promise<Boolean>`        | Android      | Show a dialog that allows the user to turn on Bluetooth.         |
| [enable()](#enable)                                         | `Promise<null>`           | Android      | Enables Bluetooth without further user interaction.              |
| [disable()](#disable)                                       | `Promise<null>`           | Android      | Disables Bluetooth without further user interaction.             |

**Important**: To use `enable()` and `disable()` on android, you have to add `BLUETOOTH_ADMIN` permission to your `AndroidManifest.xml`:

```diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android">
+    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
  </manifest>
```

---

### getState()

Returns the current state of the bluetooth service.

```js
BluetoothStateManager.getState().then(bluetoothState => {
  // do something...
}, true /*=emitCurrentState*/);
```

### onStateChange(listener, emitCurrentState)

Listen for bluetooth state changes.

```js
BluetoothStateManager.onStateChange(bluetoothState => {
  // do something...
}, true /*=emitCurrentState*/);
```

### openSettings()

##### Android

Opens the bluetooth settings.

Tested:

* Android 6.0.1 (Huawei P8 Lite ALE-L21)
* Android 7.1.1 (Galaxy J5 2016)
* Android 8.0 (Galaxy S8+ SM-G955f)

##### iOS

Opens the bluetooth settings or the general settings.

The behavior is different in the iOS versions:

* **iOS 9 and below**: Not tested (I don't have a real device with iOS 9)
* **iOS 10**: Opens the bluetooth settings
  * Tested on a iPhone 5S with iOS 10.3.3
* **iOS 11+**: Opens the general settings. **NOT** the bluetooth settings.
  * Tested on a iPhone 7 with iOS 11.3.0 and iOS 11.3.1

```js
BluetoothStateManager.openSettings();
```

### requestToEnable()

Show a dialog that allows the user to turn on Bluetooth. More here: [Android documentation](https://developer.android.com/reference/android/bluetooth/BluetoothAdapter.html#ACTION_REQUEST_ENABLE).

* This function is **only** on **android** available.

```js
BluetoothStateManager.requestToEnable().then(result => {
  // result === true -> user accepted to enable bluetooth
  // result === false -> user denied to enable bluetooth
});
```

### enable()

Enables Bluetooth without further user interaction

* This function is **only** on **android** available.
* Needs the `BLUETOOTH_ADMIN` permission.

```js
BluetoothStateManager.enable().then(result => {
  // do something...
});
```

### disable()

Disables Bluetooth without further user interaction

* This function is **only** on **android** available.

* Needs the `BLUETOOTH_ADMIN` permission.

```js
BluetoothStateManager.disable().then(result => {
  // do something...
});
```

## EVENTS

| Name                                                          | Description                                   |
| ------------------------------------------------------------- | --------------------------------------------- |
| [EVENT_BLUETOOTH_STATE_CHANGE](#event_bluetooth_state_change) | Callback for when the bluetooth state changed |

---

### EVENT_BLUETOOTH_STATE_CHANGE

Callback for when the bluetooth state changed

```js
BluetoothStateManager.addEventListener(
  BluetoothStateManager.EVENT_BLUETOOTH_STATE_CHANGE,
  bluetoothState => {
    // do something...
  }
);

// recommended: use the `onStateChange` function.
```

## Declarative API

The declarative way uses the new context api of React 16.3.

### `<BluetoothState>`

#### props

| Name               | Value Type        | Default value | Description                                                                                              |
| ------------------ | ----------------- | ------------- | -------------------------------------------------------------------------------------------------------- |
| `emitCurrentState` | `Boolean`         | `true`        | If true, current state will be emitted.                                                                  |
| `onChange`         | `Function`        | `undefined`   | Callback which emits the current state (first argument) change and the previous state (second argument). |
| `children`         | `Function` or any | `undefined`   |                                                                                                          |

### `<BluetoothState.PoweredOn>`

The `children` prop of this component will rendered only when bluetooth is turned on.

### `<BluetoothState.PoweredOff>`

The `children` prop of this component will rendered only when bluetooth is turned off.

### `<BluetoothState.Resetting>`

The `children` prop of this component will rendered only when bluetooth state is changing.

* "PoweredOff" -> "PoweredOn"
* "PoweredOn" -> "PoweredOff"

### `<BluetoothState.Unauthorized>`

The `children` prop of this component will rendered only when the app doesn't have the permission to use bluetooth.

### `<BluetoothState.Unsupported>`

The `children` prop of this component will rendered only when the device doesn't support bluetooth.

### `<BluetoothState.Unknown>`

The `children` prop of this component will rendered only when the bluetooth state is unknown.

---

### BluetoothState

An example you will find in `example/app/ExampleWithDeclarativeApi.js`

##### Context

Each component has access to the same context as shown below.

```js
{
  bluetoothState: String,
  openSettings: Function,
  requestToEnable: Function,
  enable: Function,
  disable: Function,
}
```

##### `children` prop as function:

```jsx
<BluetoothState>
  {({ bluetoothState, openSettings, requestToEnable, enable, disable }) => {
    // show something ...
    return <View />;
  }}
</BluetoothState>
```

### BluetoothState.\<BluetoothStateType\>

#### Example

```jsx
<BluetoothState>
  <BluetoothState.PoweredOn>
    <Text>This will rendered only when bluetooth is turned on.</Text>
  </BluetoothState.PoweredOn>
  <BluetoothState.PoweredOff>
    {({ requestToEnable, openSettings }) => (
      <View>
        <Text>This will rendered only when bluetooth is turned off.</Text>
        <Button
          title="This will rendered only when bluetooth is turned off."
          onPress={Platform.OS === 'android' ? requestToEnable : openSettings}
        />
      </View>
    )}
  </BluetoothState.PoweredOff>
  <BluetoothState.Resetting>
    <ActivityIndicator />
  </BluetoothState.Resetting>
  <BluetoothState.Unauthorized>
    <Text>This will rendered only when bluetooth permission is not granted.</Text>
  </BluetoothState.Unauthorized>
  <BluetoothState.Unsupported>
    <Text>This will rendered only when bluetooth is not supported.</Text>
  </BluetoothState.Unsupported>
  <BluetoothState.Unknown>
    <Text>You have a really strange phone.</Text>
  </BluetoothState.Unknown>
</BluetoothState>
```

## ToDo's

* [ ] Add tests

## License

MIT
