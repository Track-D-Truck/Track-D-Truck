import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {     
    View,
    Image
} from 'react-native'
import ChatScreen from '../screens/ChatScreen'
import HomeScreen from '../screens/HomeScreen'

const Tab = createBottomTabNavigator()

function IconBottom(props) {
  const { color, focused } = props.data
  let colorSelected = focused ? color : 'grey'
  return (
      <View>
          <Image source={props.image} style={{ width: 20, height: 20, tintColor: colorSelected }} />
      </View>
  )
}

function HomeTabNavigator() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#e91e63',
      style: { height: 50, paddingBottom: 5 },
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      }
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../../assets/home.png')} />
          )
        }}/>
      <Tab.Screen 
        name="Chat"
        component={ChatScreen} 
        options={{
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../../assets/chat.png')} />
          )
        }}/>
    </Tab.Navigator>
  )
}

export default HomeTabNavigator
