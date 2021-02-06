
#import <CoreBluetooth/CoreBluetooth.h>
#import "RNBluetoothStateManager.h"

@implementation RNBluetoothStateManager{
  CBCentralManager *internalcb;
  bool hasListeners;
}

-(CBCentralManager *)cb {
    // Calling init() for the first time will ask the user to give the app the permission
    // To prevent this happening on app start, we will delay this for the first call of `getState()`
    if (internalcb == nil) {
        internalcb = [[CBCentralManager alloc] initWithDelegate:self queue:nil options:@{CBCentralManagerOptionShowPowerAlertKey: @NO}];
        [NSThread sleepForTimeInterval: 0.05]; // Calling .state directly after init() will give us .Unknown. So just sleep for 50ms to prevent this
    }
    return internalcb;
}

-(void)startObserving {
  [self cb];
  hasListeners = YES;
}

-(void)stopObserving {
  hasListeners = NO;
}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXPORT_MODULE()

NSString *const EVENT_BLUETOOTH_STATE_CHANGE = @"EVENT_BLUETOOTH_STATE_CHANGE";

- (NSDictionary<NSString *, NSString *> *)constantsToExport {
    return @{EVENT_BLUETOOTH_STATE_CHANGE: EVENT_BLUETOOTH_STATE_CHANGE};
}

- (NSArray<NSString *> *)supportedEvents {
  return @[EVENT_BLUETOOTH_STATE_CHANGE];
}

// ----------------------------------------------------------------------------------------------- -
// BLUETOOTH STATE

RCT_EXPORT_METHOD(getState:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *stateName = [self bluetoothStateToString:[self cb].state];
  resolve(stateName);
}

-(void)centralManagerDidUpdateState:(CBCentralManager *)central{
  NSString *stateName = [self bluetoothStateToString:central.state];
  [self sendEventBluetoothStateChange:stateName];
}

// ----------------------------------------------------------------------------------------------- -
// OPEN SETTINGS

RCT_EXPORT_METHOD(openSettings:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if(&UIApplicationOpenSettingsURLString != nil){
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
  }
  resolve(nil);
}

// ----------------------------------------------------------------------------------------------- -
// NOT AVAILABLE IN iOS

RCT_EXPORT_METHOD(enable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError* error = nil;
  reject(@"UNSUPPORTED", @"Not implemented in iOS", error);
}

RCT_EXPORT_METHOD(disable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError* error = nil;
  reject(@"UNSUPPORTED", @"Not implemented in iOS", error);
}

RCT_EXPORT_METHOD(requestToEnable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError* error = nil;
  reject(@"UNSUPPORTED", @"Not implemented in iOS", error);
}

// ----------------------------------------------------------------------------------------------- -
// HELPERS

- (void)sendEventBluetoothStateChange:(NSString*)stateName {
  if (hasListeners) {
    [self sendEventWithName:EVENT_BLUETOOTH_STATE_CHANGE body:stateName];
  }
}

- (NSString*)bluetoothStateToString:(CBManagerState)state {
  switch (state)
  {
    case CBManagerStatePoweredOn:
      return @"PoweredOn";
    case CBManagerStatePoweredOff:
      return @"PoweredOff";
    case CBManagerStateResetting:
      return @"Resetting";
    case CBManagerStateUnsupported:
      return @"Unsupported";
    case CBManagerStateUnauthorized:
      return @"Unauthorized";
    case CBManagerStateUnknown:
    default:
      return @"Unknown";
  }
}

@end

