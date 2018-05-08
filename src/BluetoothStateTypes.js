export const BluetoothStateTypesList = [
  'Unknown',
  'Resetting',
  'Unsupported',
  'Unauthorized',
  'PoweredOff',
  'PoweredOn',
];

export default BluetoothStateTypesList.reduce((acc, _) => ({ ...acc, [_]: _ }), {});
