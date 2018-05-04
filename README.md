# react-native-bluetooth-state-manager

## Quick Links

* [Installation](#installation)
* [Linking](#linking)
* [Usage](#usage)
* [API](#api)
* [EVENTS](#events)
* [Declarative API](#declarative-api)
* [ToDo's](#todos)

## Installation

Using [Yarn](https://yarnpkg.com/): (recommended)

```shell
yarn add patlux/react-native-bluetooth-state-manager
```

Using [npm](https://www.npmjs.com/):

```shell
npm install patlux/react-native-bluetooth-state-manager --save
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

1.  In XCode, in the project navigator, right click \`Libraries\` ➜ \`Add Files to [your project's name]\`
2.  Go to \`node_modules\` ➜ \`react-native-bluetooth-state-manager\` and add \`RNBluetoothStateManager.xcodeproj\`
3.  In XCode, in the project navigator, select your project. Add \`libRNBluetoothStateManager.a\` to your project's \`Build Phases\` ➜ \`Link Binary With Libraries\`
4.  Run your project (\`Cmd+R\`)<

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
+ import de.patwoz.rn.bluetooth_state_manager;

public class MainApplication extends Application implements ReactApplication {
  // ...

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
+         new RNBluetoothStateManager()
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

| Method                                                      | Return Type               | OS           |
| ----------------------------------------------------------- | ------------------------- | ------------ |
| [getState()](#getstate)                                     | `Promise<BluetoothState>` | Android, iOS |
| [onStateChange(listener, emitCurrentState)](#onstatechange) | `Subscription`            | Android, iOS |
| [enable()](#enable)                                         | `Promise<Boolean>`        | Android      |
| [disable()](#disable)                                       | `Promise<Boolean>`        | Android      |
| [requestToEnable()](#requesttoenable)                       | `Promise<Boolean>`        | Android      |
| [openSettings()](#opensettings)                             | `undefined`               | Android, iOS |

---

### getState()

```js
BluetoothStateManager.getState().then(bluetoothState => {
  // do something...
});
```

### onStateChange(listener, emitCurrentState)

```js
BluetoothStateManager.onStateChange(bluetoothState => {
  // do something...
});
```

### enable()

```js
BluetoothStateManager.enable().then(result => {
  // do something...
});
```

### disable()

```js
BluetoothStateManager.disable().then(result => {
  // do something...
});
```

### requestToEnable()

```js
BluetoothStateManager.requestToEnable().then(result => {
  // do something...
});
```

### openSettings()

```js
BluetoothStateManager.openSettings();
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

// or use the alias `onStateChange`. See above.
```

## Declarative API

The declarative way uses the new conext api of React 16.3.

### `<BluetoothState>`

### `<BluetoothState.PoweredOn>`

### `<BluetoothState.PoweredOff>`

### `<BluetoothState.Resetting>`

### `<BluetoothState.Unauthorized>`

### `<BluetoothState.Unsupported>`

### `<BluetoothState.Unknown>`

---

### BluetoothState

##### Context

Each component has access to the same context as shown below. Either as `render` or as `children` prop.

```js
{
  bluetoothState: String,
  enable: Function,
  disable: Function,
  requestToEnable: Function,
  openSettings: Function,
}
```

##### Using with `render` prop:

```jsx
<BluetoothState
  render={({ bluetoothState, enable, disable, requestToEnable, openSettings }) => {
    // show something ...
    return <View />;
  }}
/>
```

##### Or with `children` as function:

```jsx
<BluetoothState>
  {({ bluetoothState, enable, disable, requestToEnable, openSettings }) => {
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
