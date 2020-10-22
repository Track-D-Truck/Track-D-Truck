import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {     
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Linking,
} from 'react-native'
import {
    useFonts,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { AppLoading } from 'expo'
import * as Location from 'expo-location'
import { updatePosition } from '../store/actions/positionAction'
import { updateHistory } from '../store/actions/historyAction'
import socket from '../config/socket'


const FlatlistItem = ({ item, truckData }) => {

    const [currentLocation, setCurrentLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setCurrentLocation(location);
        })();
      }, [currentLocation]);

    const [fontsLoaded] = useFonts({
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
      });

    const dispatch = useDispatch()
    const updatedPosition = useSelector(state => state.positionReducer.updatedPosition)
    const nextDestination = useSelector(state => state.positionReducer.nextDestination)
    const [currentCoordinate, setCurrentCoordinate] = useState('')

    let found = false
    for(const el of updatedPosition){
        if(el === item.location){
            found = true
            break
        }
    }     

    const update = (location) => {
        let payload = {
            location,
            truckId: truckData.id
        }
        socket.emit("SET_COORDINATE", payload)
        dispatch(updatePosition(truckData, location))  
        dispatch(updateHistory(item))  
    }

    const getDirection = (coordinate) => {
        console.log(coordinate);
        Linking.openURL(`http://www.google.com/maps/dir/${currentLocation.coords.latitude},${currentLocation.coords.longitude}/${coordinate.location.split(', ').join(',')}`)
    }
    
    //scoket io
    useEffect(()=> {
        socket.on("SET_COORDINATE", payload => {
            setCurrentCoordinate(payload.location)
        })
        return () => {
            console.log("clean up in flatlist item component");
        }  
    }, [currentCoordinate])
    if (!fontsLoaded) {
        return <AppLoading/>
    }else{
        return (
            <View>
                <Text style={{ color: '#555555', fontSize: 20, padding: 5, fontFamily:'Quicksand_700Bold'}}>{item.name}</Text>
                <Text style={{padding: 5, fontFamily: 'Quicksand_500Medium'}}>{item.address}</Text>
                {!found ? 
                <View style={{ flexDirection: 'row'}}> 
                    <Image source={require('../../assets/trash-truck.png')} style={{ width: 30, height: 30}} />
                    <Text style={{padding: 5, color: '#F1C40F', fontSize: 20, fontFamily:'Quicksand_700Bold'}}>On Progress</Text>
                </View>
                :
                <View style={{ flexDirection: 'row'}}>
                    <Image source={require('../../assets/check.png')} style={{ width: 30, height: 30}} />
                    <Text style={{padding: 5, color: '#2ECC71', fontSize: 20, fontFamily:'Quicksand_700Bold'}}>Done</Text>
                </View>}
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
                    {!found && (nextDestination === item.address) &&   
                    <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity 
                    style={[styles.button, {marginRight: 5, marginLeft: 5, backgroundColor: '#E74C3C'}]}
                    onPress={() => {
                        getDirection(item)
                    }}>
                        <Text style={{color: '#fff', fontFamily:'Quicksand_700Bold'}}>Get direction</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[styles.button, {marginRight: 5, marginLeft: 5}]}
                    onPress={() => {
                        update(item.location)
                    }}>
                        <Text style={{color: '#fff', fontFamily:'Quicksand_700Bold'}}>Update</Text>
                    </TouchableOpacity>
                    </View>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#2980b9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
          width: 0,
          height: 4
        }
    }
  });

export default FlatlistItem