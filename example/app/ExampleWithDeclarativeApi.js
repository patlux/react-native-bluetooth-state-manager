import React from 'react';
import { View, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import {
  Text,
  Title,
  Button,
  Card,
  CardContent,
  Paragraph,
  CardActions,
  ListSection,
} from 'react-native-paper';

import AppState from 'react-native-app-state';
import { BluetoothState } from 'react-native-bluetooth-state-manager';

class ExampleWithDeclarativeApi extends React.PureComponent {
  state = { bluetoothAdminPermission: null };

  // --------------------------------------------------------------------------------------------- -
  // COMPONENT

  componentDidMount() {
    this.checkPermission();
  }

  // --------------------------------------------------------------------------------------------- -
  // BLUETOOTH ADMIN PERMISSION (android)

  checkPermission = () => {
    if (Platform.OS === 'ios') {
      return Promise.resolve(false);
    }
    return PermissionsAndroid.check('android.permission.BLUETOOTH_ADMIN').then(granted => {
      this.setState({ bluetoothAdminPermission: granted });
      return granted;
    });
  };

  // --------------------------------------------------------------------------------------------- -
  // EVENTS

  onAppStateChange = (appState, prevAppState) => {
    if (prevAppState !== 'active' && appState === 'active') {
      this.checkPermission();
    }
  };

  onBluetoothStateChange = (bluetoothState, prevBluetoothState) => {
    console.log(
      this.constructor.name,
      `onBluetoothStateChange("${bluetoothState}", "${prevBluetoothState}")`
    );
  };

  // --------------------------------------------------------------------------------------------- -
  // RENDER

  render() {
    return (
      <AppState onChange={this.onAppStateChange}>
        <ListSection title="Example with declarative API">
          <BluetoothState onChange={this.onBluetoothStateChange}>
            <BluetoothState.PoweredOn>
              {({ disable }) => (
                <Card>
                  <CardContent>
                    <Title>Bluetooth is enabled! :)</Title>
                  </CardContent>
                  <CardActions>
                    {this.state.bluetoothAdminPermission && (
                      <Button primary onPress={disable}>
                        Disable
                      </Button>
                    )}
                  </CardActions>
                </Card>
              )}
            </BluetoothState.PoweredOn>
            <BluetoothState.PoweredOff>
              {({ requestToEnable, openSettings, enable }) => (
                <Card>
                  <CardContent>
                    <Title>Please enable bluetooth</Title>
                    {Platform.OS === 'android' &&
                      this.state.bluetoothAdminPermission && (
                        <Button raised primary onPress={enable}>
                          Enable bluetooth
                        </Button>
                      )}
                    {Platform.OS === 'ios' && (
                      <Button raised primary onPress={openSettings}>
                        {Platform.Version <= 10 ? 'Open bluetooth settings' : 'Open settings'}
                      </Button>
                    )}
                    {Platform.OS === 'android' && (
                      <Button raised onPress={openSettings}>
                        Open settings
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </BluetoothState.PoweredOff>
            <BluetoothState.Resetting>
              <Card>
                <CardContent>
                  <ActivityIndicator />
                </CardContent>
              </Card>
            </BluetoothState.Resetting>
            <BluetoothState.Unauthorized>
              <Card>
                <CardContent>
                  <Text>Please allow us to use bluetooth</Text>
                </CardContent>
              </Card>
            </BluetoothState.Unauthorized>
            <BluetoothState.Unsupported>
              <Card>
                <CardContent>
                  <Text>Your phone doesn't support bluetooth :(</Text>
                </CardContent>
              </Card>
            </BluetoothState.Unsupported>
            <BluetoothState.Unknown>
              <Card>
                <CardContent>
                  <Text>You have a really strange phone.</Text>
                </CardContent>
              </Card>
            </BluetoothState.Unknown>
          </BluetoothState>
        </ListSection>
      </AppState>
    );
  }
}

export default ExampleWithDeclarativeApi;
