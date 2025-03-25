import { SafeAreaView } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Platform, Text, View } from 'react-native'
import {
  BluetoothStateManager,
  useBluetoothState,
} from 'react-native-bluetooth-state-manager'
import { useTheme } from '@react-navigation/native'
import { Permissions } from './Permissions'

export const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ListenerSection />
      <Divider />
      <CurrentState />
      <Divider />

      {Platform.OS === 'android' && (
        <Permissions>
          <RequestToEnableBluetooth />
          <View style={{ height: 8, width: 8 }} />
          <RequestToDisableBluetooth />
        </Permissions>
      )}
    </SafeAreaView>
  )
}

const Divider = () => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        marginVertical: 15,
        width: 100,
        height: 1,
        backgroundColor: colors.text,
        opacity: 70,
      }}
    />
  )
}

const CurrentState = () => {
  const state = useBluetoothState()
  return <Text style={{ color: 'white' }}>State: {state}</Text>
}

const RequestToEnableBluetooth = () => {
  console.log(`RequestToEnable()`)
  const requestToEnableMutation = useMutation({
    mutationFn: async () => {
      console.log(`Start...`)
      const result = await BluetoothStateManager.requestToEnable()
      console.log(`...end. Result = "${result}".`)
      return result
    },
    onError: (error) => {
      console.error(error)
      Alert.alert(`Error`, `${error}`)
    },
    onSuccess: () => {
      Alert.alert(`Bluetooth enabled`)
    },
  })

  return (
    <Button
      title={
        'Enable bluetooth' + (requestToEnableMutation.isPending ? '...' : '')
      }
      disabled={requestToEnableMutation.isPending}
      onPress={() => requestToEnableMutation.mutate()}
    />
  )
}

const RequestToDisableBluetooth = () => {
  const disableMutation = useMutation({
    mutationFn: async () => {
      await BluetoothStateManager.requestToDisable()
    },
    onError: (error) => {
      console.error(error)
      Alert.alert(`Error`, `${error}`)
    },
    onSuccess: () => {
      Alert.alert(`Bluetooth disabled`)
    },
  })

  return (
    <Button
      title={'Disable Bluetooth' + (disableMutation.isPending ? '...' : '')}
      disabled={disableMutation.isPending}
      onPress={() => disableMutation.mutate()}
    />
  )
}

const ListenerSection = () => {
  const [count, setCount] = useState(0)
  console.log(
    new Date().toISOString(),
    count,
    BluetoothStateManager.getStateSync(),
  )

  useEffect(() => {
    BluetoothStateManager.getState().then((state) => {
      console.log(new Date().toISOString(), `from promise="${state}"`)
    })
  }, [])

  return (
    <>
      {new Array(count).fill(0).map((_, index) => {
        return <Listener key={index} index={index} />
      })}
      <Button title="Add" onPress={() => setCount((prev) => prev + 1)} />
      <Button title="Remove" onPress={() => setCount((prev) => prev - 1)} />
      <Button
        title="Open Settings"
        onPress={() => BluetoothStateManager.openSettings()}
      />
    </>
  )
}

const Listener = ({ index }: { index: number }) => {
  const [state, setState] = useState(BluetoothStateManager.getStateSync())

  useEffect(() => {
    console.log(`start listening..`)
    const remove = BluetoothStateManager.addListener((newState) => {
      console.log(`########### FROM LISTENER`, { newState })
      setState(newState)
    })
    return () => {
      console.log(`unsub = ${typeof remove}`)
      remove()
    }
  }, [index])

  return (
    <Text
      onPress={() => {
        setState(BluetoothStateManager.getStateSync())
      }}
      style={{ color: 'white' }}
    >
      Status: {state}
    </Text>
  )
}
