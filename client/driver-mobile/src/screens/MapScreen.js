import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {     
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Image,
    FlatList
} from 'react-native'
import { AppLoading } from 'expo'
import {
    useFonts,
    // Quicksand_300Light,
    // Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { fetchResult } from '../store/actions/resultAction'
import Map from '../components/Map'
import CustomHeader from '../components/CustomHeader'
import NoTask from '../components/NoTask'
import FlatlistItem from '../components/FlatlistItem'
import ProgressScreen from './ProgressScreen'

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
      });

    // const dispatch = useDispatch()
    
    const [myResult, setMyResult] = useState(null)
    const [waypoints, setWaypoints] = useState(null)
    // console.log(myResult, "<<< my result di mapscreen");

    const result = useSelector(state => state.resultReducer.result)
    // const user = useSelector(state => state.userReducer)

    // useEffect(() => {
    //     dispatch(fetchResult())
    // }, [dispatch, user.id])

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

    if (!fontsLoaded) {
        return <AppLoading/>
    }else{
        return (
            <View style={styles.container}>
                {!myResult && !waypoints && <ActivityIndicator size="large" color="#dfe6e9"/>}
                {myResult && waypoints &&
                <View style={StyleSheet.absoluteFill}>
                    <Map waypoints={waypoints}/>
                    <FlatList
                    data={waypoints}
                    keyExtractor={el => el.address}
                    renderItem={({ item })  => {
                        return (
                        <View style={styles.itemContainer}>
                            <Text style={{ fontFamily: 'Quicksand_700Bold'}}>{item.name}</Text>
                            <Text style={{ fontFamily: 'Quicksand_500Medium'}}>{item.address}</Text>
                            <TouchableOpacity style={styles.btnOpenMap}>
                                <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'Quicksand_700Bold'}}>Open Map</Text>
                            </TouchableOpacity>  
                        </View>
                        )
                    }}/>
                </View>}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
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