import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {     
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import { fetchResult } from '../store/actions/resultAction'
import Map from '../components/Map'

const MapScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    
    const [myResult, setMyResult] = useState(null)
    const [waypoints, setWaypoints] = useState(null)

    const result = useSelector(state => state.resultReducer.result)
    const userId = useSelector(state => state.userReducer.id)

    useEffect(() => {
        dispatch(fetchResult())
    }, [dispatch, userId])

    useEffect(() => {  
        if(result){
            const temp = []
            for(const route of result.route){
                const splittedLocation = route.location.split(', ')
                temp.push({
                    latitude: +splittedLocation[0],
                    longitude: +splittedLocation[1],
                    name: route.name,
                    address: route.address
                })
            }
            setWaypoints(temp)
            setMyResult(result)
        }
    }, [result])

    return (
        <View style={styles.container}>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={styles.headerFont}>Route</Text>
            </View>
            {!myResult && !waypoints && <ActivityIndicator size="large" color="#dfe6e9"/>}
            {myResult && waypoints &&
                <View>
                    <Map waypoints={waypoints}/>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    headerFont: {
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: 0.15,
        color: '#555555'
    }
  });


export default MapScreen