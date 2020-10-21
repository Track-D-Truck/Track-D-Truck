import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {     
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Image
} from 'react-native'
import { AppLoading } from 'expo'
import {
    useFonts,
    // Quicksand_300Light,
    // Quicksand_400Regular,
    // Quicksand_500Medium,
    // Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { fetchResult } from '../store/actions/resultAction'
import Map from '../components/Map'
import CustomHeader from '../components/CustomHeader'
import NoTask from '../components/NoTask'

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        Quicksand_700Bold,
      });

    const dispatch = useDispatch()


    const result = useSelector(state => state.resultReducer.result)
    const user = useSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(fetchResult())
    }, [dispatch, user.id])

    if (!fontsLoaded) {
        return <AppLoading/>
    }else{
        return (
            <View style={styles.container}>
                <CustomHeader/>
                <View style={{
                    height: 200,
                    justifyContent: 'center',
                    paddingLeft: 20
                }}>
                    <Text style={styles.headerFont}>Welcome, {user.name}</Text>
                    <Text style={styles.headerFont}>Have a nice day!</Text>
                </View>
                {!result ?
                    <NoTask/> :
                    <View style={ styles.contentContainer}>
                        <View style={[styles.newTaskContainer]}>
                            <View style={{ width: '40%'}}>
                                <Image source={require('../../assets/trash-truck.png')} style={{ width: 120, height: 120, alignSelf: 'flex-end'}} />
                            </View>
                            <View style={{ width: '60%'}}>
                                <Image source={require('../../assets/warn.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end'}} />
                                <Text style={{ fontFamily: 'Quicksand_700Bold', fontSize: 20, marginTop: 27, marginBottom: 5, color: '#555555', alignSelf: 'flex-end'}}>New task available</Text>
                                <TouchableOpacity style={styles.btnViewRoute} onPress={() => {
                                    navigation.navigate('Map')
                                }}>
                                    <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'Quicksand_700Bold'}}>View Routes</Text>
                                </TouchableOpacity>  
                            </View>                             
                        </View>
                </View>
                }
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
    headerFont: {
        fontSize: 30,
        letterSpacing: 0.15,
        color: '#fff',
        fontFamily: 'Quicksand_700Bold'
    },
    contentContainer: {
        height: 200,
        width,
        justifyContent: 'center',
        padding: 20
    },
    newTaskContainer: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
          width: 0,
          height: 4
        }

    },
    btnViewRoute: { 
        borderRadius: 5,
        width: 110,
        padding: 10,
        backgroundColor: '#e91e63',
        alignSelf: 'flex-end'
    },
    btnViewContainer: {
        borderWidth: 2, 
        borderColor: 'black',
        alignSelf: 'flex-end', 
    }
  });


export default HomeScreen