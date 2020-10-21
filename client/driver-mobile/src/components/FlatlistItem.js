import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {     
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import { updatePosition } from '../store/actions/positionAction'
import socket from '../config/socket'


const FlatlistItem = ({ item, truckData }) => {
    console.log(truckData, "<<ini truck data")

    const dispatch = useDispatch()
    const position = useSelector(state => state.positionReducer.updatedPosition)
    const [currentCoordinate, setCurrentCoordinate] = useState('')

    console.log(currentCoordinate, '<<< coordinate sekarang');

    let found = false
    for(const el of position){
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
    }

    
    //scoket io
    useEffect(()=> {
        socket.on("SET_COORDINATE", payload => {
            setCurrentCoordinate(payload.location)
        })
    }, [currentCoordinate])

    return (
        <View>
            <Text style={{ color: '#555555', fontSize: 20, fontWeight: 'bold', padding: 5}}>{item.name}</Text>
            <Text style={{padding: 5}}>{item.address}</Text>
            {!found ? 
            <View style={{ flexDirection: 'row'}}> 
                <Image source={require('../../assets/trash-truck.png')} style={{ width: 30, height: 30}} />
                <Text style={{padding: 5, fontWeight: 'bold', color: '#F1C40F', fontSize: 20}}>On Progress</Text>
            </View>
             :
             <View style={{ flexDirection: 'row'}}>
                <Image source={require('../../assets/check.png')} style={{ width: 30, height: 30}} />
                <Text style={{padding: 5, fontWeight: 'bold', color: '#2ECC71', fontSize: 20}}>Done</Text>
             </View>}
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
            {/* <TouchableOpacity 
                 style={[styles.button, {marginRight: 5, marginLeft: 5, backgroundColor: '#E74C3C'}]}
                 >
                    <Text style={[styles.fontWhite]}>Open Map</Text>
                </TouchableOpacity> */}
                {!found &&                 
                <TouchableOpacity 
                style={[styles.button, {marginRight: 5, marginLeft: 5}]}
                onPress={() => {
                    update(item.location)
                }}>
                    <Text style={styles.fontWhite}>Update</Text>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 100,
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
    },
    fontWhite: {
        fontWeight: 'bold',
        color: 'white'
    }
  });

export default FlatlistItem