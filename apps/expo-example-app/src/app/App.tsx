import { SafeAreaView, StatusBar, Text } from 'react-native'

export const App = () => {
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
      </SafeAreaView>
    </>
  )
}

export default App
