import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {     
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import { AppLoading } from 'expo'
import {
    useFonts,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import Map from '../components/Map'

const MapScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
      });
    
    const [myResult, setMyResult] = useState(null)
    const [waypoints, setWaypoints] = useState(null)

    const result = useSelector(state => state.resultReducer.result)    

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
        return () => {
            console.log("clean up in map screen");
        }  
    }, [result])

    if (!fontsLoaded) {
        return <AppLoading/>
    }else{
        return (
            <View style={styles.container}>
                {!myResult && !waypoints && <ActivityIndicator size="large" color="#dfe6e9"/>}
                {myResult && waypoints &&
                <View style={StyleSheet.absoluteFill}>
                    <Map waypoints={waypoints}/>
                </View>}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    itemContainer: {
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#7f8c8d',
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
          width: 0,
          height: 4
        }
    },
    btnOpenMap: { 
        borderRadius: 5,
        width: 110,
        padding: 10,
        backgroundColor: '#e91e63',
        alignSelf: 'flex-end'
    }
  });


export default MapScreen