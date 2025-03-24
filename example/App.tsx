import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {
  BluetoothStateManager,
  useBluetoothState,
} from 'react-native-bluetooth-state-manager';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const queryClient = new QueryClient();

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <RootStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <ListenerSection />
      <Divider />
      <CurrentState />
      <Divider />

      {Platform.OS === 'android' && (
        <CheckPermission>
          <RequestToEnableBluetooth />
          <View style={{ height: 8, width: 8 }} />
          <RequestToDisableBluetooth />
        </CheckPermission>
      )}
    </SafeAreaView>
  );
};

const Divider = () => {
  return (
    <View
      style={{
        marginVertical: 15,
        width: 100,
        height: 1,
        backgroundColor: 'white',
        opacity: 70,
      }}
    />
  );
};

const CurrentState = () => {
  const state = useBluetoothState();
  return <Text style={{ color: 'white' }}>State: {state}</Text>;
};

const CheckPermission = ({ children }: PropsWithChildren) => {
  const { data } = useQuery({
    queryKey: ['/permissions', '/bluetooth-connect'],
    queryFn: () => {
      return check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    },
  });

  const requestPermission = useMutation({
    mutationFn: async () => {
      return request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/permissions', '/bluetooth-connect'],
      });
    },
  });

  console.log(`CheckPermission()`, {
    data,
    requestError: requestPermission.error,
  });

  if (data !== 'granted') {
    return (
      <Button
        title="Request for permission"
        disabled={requestPermission.isPending}
        onPress={() => requestPermission.mutate()}
      />
    );
  }

  return <>{children}</>;
};

const RequestToEnableBluetooth = () => {
  console.log(`RequestToEnable()`);
  const requestToEnableMutation = useMutation({
    mutationFn: async () => {
      console.log(`Start...`);
      const result = await BluetoothStateManager.requestToEnable();
      console.log(`...end. Result = "${result}".`);
      return result;
    },
    onError: error => {
      console.error(error);
      Alert.alert(`Error`, `${error}`);
    },
    onSuccess: () => {
      Alert.alert(`Bluetooth enabled`);
    },
  });

  return (
    <Button
      title={
        'Enable bluetooth' + (requestToEnableMutation.isPending ? '...' : '')
      }
      disabled={requestToEnableMutation.isPending}
      onPress={() => requestToEnableMutation.mutate()}
    />
  );
};

const RequestToDisableBluetooth = () => {
  const disableMutation = useMutation({
    mutationFn: async () => {
      await BluetoothStateManager.requestToDisable();
    },
    onError: error => {
      console.error(error);
      Alert.alert(`Error`, `${error}`);
    },
    onSuccess: () => {
      Alert.alert(`Bluetooth disabled`);
    },
  });

  return (
    <Button
      title={'Disable Bluetooth' + (disableMutation.isPending ? '...' : '')}
      disabled={disableMutation.isPending}
      onPress={() => disableMutation.mutate()}
    />
  );
};

const ListenerSection = () => {
  const [count, setCount] = useState(0);
  console.log(
    new Date().toISOString(),
    count,
    BluetoothStateManager.getStateSync(),
  );

  useEffect(() => {
    BluetoothStateManager.getState().then(state => {
      console.log(new Date().toISOString(), `from promise="${state}"`);
    });
  }, []);

  return (
    <>
      {new Array(count).fill(0).map((_, index) => {
        return <Listener key={index} index={index} />;
      })}
      <Button title="Add" onPress={() => setCount(prev => prev + 1)} />
      <Button title="Remove" onPress={() => setCount(prev => prev - 1)} />
      <Button
        title="Open Settings"
        onPress={() => BluetoothStateManager.openSettings()}
      />
    </>
  );
};

const Listener = ({ index }: { index: number }) => {
  const [state, setState] = useState(BluetoothStateManager.getStateSync());

  useEffect(() => {
    console.log(`start listening..`);
    const remove = BluetoothStateManager.addListener(newState => {
      console.log(`########### FROM LISTENER`, { newState });
      setState(newState);
    });
    return () => {
      console.log(`unsub = ${typeof remove}`);
      remove();
    };
  }, [index]);

  return (
    <Text
      onPress={() => {
        setState(BluetoothStateManager.getStateSync());
      }}
      style={{ color: 'white' }}>
      Status: {state}
    </Text>
  );
};

export default App;
