import React from 'react';

import BluetoothStateContext from './BluetoothStateContext';

const isFn = (_) => typeof _ === 'function';
const renderChildren = (children, args) => (isFn(children) ? children(args) : children);

const withBluetoothStateType = (bluetoothState) => ({ children }) => (
  <BluetoothStateContext.Consumer>
    {(context) => {
      return context.bluetoothState === bluetoothState ? renderChildren(children, context) : null;
    }}
  </BluetoothStateContext.Consumer>
);

export default withBluetoothStateType;
