import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { store } from './src/store/'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'
import HomeScreen2 from './src/screens/HomeScreen2'
import MapTabNavigator from './src/components/MapTabNavigator'
import HomeTabNavigator from './src/components/HomeTabNavigator'
import { StatusBar, LogBox } from 'react-native';
import Loading from './src/components/Loading'
import HistoryScreen from './src/screens/HistoryScreen'


const Stack = createStackNavigator()

export default function App () {
  LogBox.ignoreAllLogs()
  return (
    <Provider store={store}>
      <StatusBar hidden={true} />
      <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen 
              name='Login'
              component={LoginScreen}
              options={{
                headerShown: false
              }}/>
          <Stack.Screen 
              name='Loading'
              component={Loading}
              options={{
                headerShown: false
              }}/>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{
                headerShown: false
              }}/>
            <Stack.Screen
              name='History'
              component={HistoryScreen}/>
            <Stack.Screen
              name='Home Page'
              component={HomeScreen2}
              options={{
                headerShown: false
              }}/>
            <Stack.Screen
              name='Map'
              component={MapTabNavigator}
              />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
