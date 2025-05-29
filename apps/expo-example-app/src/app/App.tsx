import { useState } from 'react'
import { Alert, Pressable, SafeAreaView, StatusBar, Text } from 'react-native'
import {
  BluetoothStateManager,
  useBluetoothState,
} from 'react-native-bluetooth-state-manager'

export const App = () => {
  const [items, setItems] = useState<number[]>([...Array(5)].map((_, i) => i))
  const [enabled, setEnabled] = useState(false)

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 12,
        }}
      >
        <Text>Example Expo App</Text>

        <Pressable
          onPress={() => {
            setEnabled((prev) => !prev)
          }}
        >
          <Text>Enabled: {enabled ? 'Yes' : 'No'}</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            Alert.alert('State', BluetoothStateManager.getStateSync())
          }}
        >
          <Text>Get State Sync</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            BluetoothStateManager.getState()
              .then((state) => {
                Alert.alert('State', state)
              })
              .catch((error) => {
                Alert.alert('State error', error)
              })
          }}
        >
          <Text>Get State</Text>
        </Pressable>

        {items.map((_, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                setItems((prev) => {
                  const next = [
                    ...prev.slice(0, index),
                    ...prev.slice(index + 1),
                  ]
                  return next
                })
              }}
            >
              <Text>{index}.</Text>
              <Listener enabled={enabled} />
            </Pressable>
          )
        })}
        <Pressable
          onPress={() => {
            setItems((prev) => {
              return [...prev, prev.length]
            })
          }}
        >
          <Text>Add</Text>
        </Pressable>
      </SafeAreaView>
    </>
  )
}

const Listener = ({ enabled }: { enabled: boolean }) => {
  const bleState = useBluetoothState(enabled)
  console.log({ bleState })
  return <Text>{bleState}</Text>
}

export default App
