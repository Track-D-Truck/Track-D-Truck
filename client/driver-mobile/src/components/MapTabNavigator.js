import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {     
    View,
    Image
} from 'react-native'
import MapScreen from '../screens/MapScreen'
import ProgressScreen from '../screens/ProgressScreen'
import ChatScreen from '../screens/ChatScreen'

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

function MapTabNavigator() {
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
        name="Route"
        component={MapScreen}
        options={{
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../../assets/route.png')} />
          )
        }}/>
      <Tab.Screen 
        name="Checklist"
        component={ProgressScreen} 
        options={{
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../../assets/checklist.png')} />
          )
        }}/>
        {/* <Tab.Screen 
        name="Chat"
        component={ChatScreen} 
        options={{
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../../assets/chat.png')} />
          )
        }}/> */}
    </Tab.Navigator>
  )
}

export default MapTabNavigator
