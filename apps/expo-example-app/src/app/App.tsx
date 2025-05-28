import { useState } from 'react'
import { Pressable, SafeAreaView, StatusBar, Text } from 'react-native'
import { useBluetoothState } from 'react-native-bluetooth-state-manager'

export const App = () => {
  const [items, setItems] = useState<number[]>([...Array(5)].map((_, i) => i))
  console.log({ items })

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Example Expo App</Text>
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
              <Listener />
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

const Listener = () => {
  const bleState = useBluetoothState()
  console.log({ bleState })
  return <Text>{bleState}</Text>
}

export default App
