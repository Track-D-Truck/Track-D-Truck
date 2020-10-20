import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {     
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { updatePosition } from '../store/actions/positionAction'
import socket from '../config/socket'


const FlatlistItem = ({ item, truckData }) => {

    const dispatch = useDispatch()
    // const position = useSelector(state => state.positionReducer.updatedPosition)
    const [currentCoordinate, setCurrentCoordinate] = useState('')
    const [isDone, setIsDone] = useState(false)

    console.log(isDone, '<<< done');
    console.log(currentCoordinate, '<<< coordinate sekarang');

    // let found = false
    // for(const el of position){
    //     if(el === item.location){
    //         found = true
    //         break
    //     }
    // } 

    const update = (location) => {
        socket.emit("SET_COORDINATE", location)
        setIsDone(true)
        // dispatch(updatePosition(truckData, location))        
    }

    
    //scoket io
    useEffect(()=> {
        socket.on("SET_COORDINATE", coordinate => {
            setCurrentCoordinate(coordinate)
        })
    }, [currentCoordinate])

    return (
        <View>
            <Text style={{ color: '#555555', fontSize: 20, fontWeight: 'bold', padding: 5}}>{item.name}</Text>
            <Text style={{padding: 5}}>{item.address}</Text>
            {!isDone ? 
            <Text style={{padding: 5, fontWeight: 'bold', color: '#F1C40F', fontSize: 20}}>On Progress</Text> :
            <Text style={{padding: 5, fontWeight: 'bold', color: '#2ECC71', fontSize: 20}}>Done</Text>}
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
            {/* <TouchableOpacity 
                 style={[styles.button, {marginRight: 5, marginLeft: 5, backgroundColor: '#E74C3C'}]}
                 >
                    <Text style={[styles.fontWhite]}>Open Map</Text>
                </TouchableOpacity> */}
                {!isDone &&                 
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
        backgroundColor: '#28ABB9',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#fff',
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