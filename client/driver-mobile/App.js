import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider } from 'react-redux'
import { store } from './src/store/'
import LoginScreen from './src/screens/LoginScreen'
import MapScreen from './src/screens/MapScreen'
import ProgressScreen from './src/screens/ProgressScreen'
// require('dotenv').config()
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Route" component={MapScreen} />
      <Tab.Screen name="Detail Route" component={ProgressScreen} />
    </Tab.Navigator>
  )
}

export default function App () {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Home' component={HomeTabNavigator}/>
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
