import React from 'react';
import { View } from 'react-native';
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
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

class ExampleWithApi extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { bluetoothState: null, requesting: null };
  }

  componentDidMount() {
    this.bluetoothStateChangeSubscription = BluetoothStateManager.onStateChange(
      this.onBluetoothStateChange,
      true /*=emitCurrentState*/
    );
  }

  componentWillUnmount() {
    if (this.bluetoothStateChangeSubscription) {
      this.bluetoothStateChangeSubscription.remove();
    }
  }

  // --------------------------------------------------------------------------------------------- -
  // EVENTS

  onBluetoothStateChange = bluetoothState => {
    this.setState({ bluetoothState });
  };

  // --------------------------------------------------------------------------------------------- -
  // UI EVENTS

  onPressGetState = () => {
    this.setState({ requesting: 'getState' });
    BluetoothStateManager.getState()
      .then(bluetoothState => {
        this.setState({ bluetoothState });
      })
      .then(() => {
        this.setState({ requesting: null });
      });
  };

  onPressEnableBluetooth = () => {
    this.setState({ requesting: 'enable' });
    BluetoothStateManager.enable()
      .then(() => {
        console.log(this.constructor.name, 'enable()', 'Success!');
      })
      .catch(error => {
        console.log(this.constructor.name, 'enable()', 'ERROR!', error.code, error);
      })
      .then(() => {
        this.setState({ requesting: null });
      });
  };

  onPressDisableBluetooth = () => {
    this.setState({ requesting: 'disable' });
    BluetoothStateManager.disable()
      .then(() => {
        console.log(this.constructor.name, 'disable()', 'Success!');
      })
      .catch(error => {
        console.log(this.constructor.name, 'disable()', 'ERROR!', error.code, error);
      })
      .then(() => {
        this.setState({ requesting: null });
      });
  };

  onPressRequestToEnableBluetooth = () => {
    this.setState({ requesting: 'requestToEnable' });
    BluetoothStateManager.requestToEnable()
      .then(() => {
        console.log(this.constructor.name, 'requestToEnable()', 'Success!');
      })
      .catch(error => {
        console.log(this.constructor.name, 'requestToEnable()', 'ERROR!', error.code, error);
      })
      .then(() => {
        this.setState({ requesting: null });
      });
  };

  onPressOpenSettings = () => {
    this.setState({ requesting: 'openSettings' });
    BluetoothStateManager.openSettings()
      .then(() => {
        console.log(this.constructor.name, 'openSettings()', 'Success!');
      })
      .catch(error => {
        console.log(this.constructor.name, 'openSettings()', 'ERROR!', error.code, error);
      })
      .then(() => {
        this.setState({ requesting: null });
      });
  };

  // --------------------------------------------------------------------------------------------- -
  // RENDER

  render() {
    return (
      <ListSection title="Example with API">
        <Card>
          <CardContent>
            <Title>Bluetooth state: {this.state.bluetoothState}</Title>
            <CardActions>
              <Button
                raised
                primary
                onPress={this.onPressGetState}
                loading={this.state.requesting === 'getState'}
              >
                Get state
              </Button>
              <Button
                raised
                primary
                onPress={this.onPressEnableBluetooth}
                loading={this.state.requesting === 'enable'}
              >
                Enable
              </Button>
              <Button
                raised
                primary
                onPress={this.onPressDisableBluetooth}
                loading={this.state.requesting === 'disable'}
              >
                Disable
              </Button>
            </CardActions>
            <CardActions>
              <Button
                raised
                onPress={this.onPressRequestToEnableBluetooth}
                loading={this.state.requesting === 'requestToEnable'}
              >
                Request
              </Button>
              <Button
                raised
                onPress={this.onPressOpenSettings}
                loading={this.state.requesting === 'openSettings'}
              >
                Open settings
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </ListSection>
    );
  }
}

export default ExampleWithApi;
