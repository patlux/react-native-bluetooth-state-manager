import PropTypes from 'prop-types';
import React from 'react';

import BluetoothStateManager from '../BluetoothStateManager';
import BluetoothStateContext, { INITIAL_STATE } from './BluetoothStateContext';
import withBluetoothStateType from './withBluetoothStateType';
import { BluetoothStateTypesList } from '../BluetoothStateTypes';

class BluetoothStatus extends React.PureComponent {
  static propTypes = {
    emitCurrentBleState: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    emitCurrentBleState: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      context: {
        ...INITIAL_STATE,
        openSettings: BluetoothStateManager.openSettings,
        requestToEnable: BluetoothStateManager.requestToEnable,
        enable: BluetoothStateManager.enable,
        disable: BluetoothStateManager.disable,
      },
    };
    this.bluetoothStateListener = null;
  }

  // --------------------------------------------------------------------------------------------- -
  // COMPONENT

  componentDidMount() {
    this.addBluetoothStateListener();
  }

  componentWillUnmount() {
    this.removeBluetoothStateListener();
  }

  setContextState = (nextContext) => {
    this.setState((prevState) => {
      const resolvedNextState =
        typeof nextContext === 'function' ? nextContext(prevState.context) : nextContext;
      return {
        context: {
          ...prevState.context,
          ...resolvedNextState,
        },
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { bluetoothState } = this.state.context;
    if (bluetoothState !== prevState.context.bluetoothState) {
      this.props.onChange && this.props.onChange(bluetoothState, prevState.context.bluetoothState);
    }
  }

  // --------------------------------------------------------------------------------------------- -
  // EVENTS

  addBluetoothStateListener = () => {
    this.removeBluetoothStateListener();
    this.bluetoothStateListener = BluetoothStateManager.onStateChange(
      this.onBluetoothStateChange,
      this.props.emitCurrentBleState
    );
  };

  removeBluetoothStateListener = () => {
    this.bluetoothStateListener && this.bluetoothStateListener.remove();
  };

  onBluetoothStateChange = (bluetoothState) => {
    this.setContextState({ bluetoothState });
  };

  // --------------------------------------------------------------------------------------------- -
  // RENDER

  render() {
    const { children } = this.props;
    return (
      <BluetoothStateContext.Provider value={this.state.context}>
        {typeof children === 'function' ? children(this.state.context) : children}
      </BluetoothStateContext.Provider>
    );
  }
}

BluetoothStateTypesList.forEach(
  (bluetoothStateType) =>
    (BluetoothStatus[bluetoothStateType] = withBluetoothStateType(bluetoothStateType))
);

export default BluetoothStatus;
