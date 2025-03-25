import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import { createStaticNavigation, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from './HomeScreen'
import { queryClient } from './queryClient'

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
})

const Navigation = createStaticNavigation(RootStack)

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation theme={DarkTheme} />
    </QueryClientProvider>
  )
}

export default App
