import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {     
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import { AppLoading } from 'expo'
import {
    useFonts,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
// import { fetchResult } from '../store/actions/resultAction'
import { fetchHistory } from '../store/actions/historyAction'
import CustomHeader from '../components/CustomHeader'
import NoTask from '../components/NoTask'

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        Quicksand_700Bold,
      });

    // const dispatch = useDispatch()

    const result = useSelector(state => state.resultReducer.result)
    const user = useSelector(state => state.userReducer)
    const histories = useSelector(state => state.historyReducer.histories)
    

    function compare_date(a, b){
        if(a.date > b.date){
                return -1;
        }else if(a.date < b.date){
                return 1;
        }else{
                return 0;
        }
    }

    const sortedHistories = histories.sort(compare_date)

    // useEffect(() => {
    //     dispatch(fetchResult())
    //     return () => {
    //         console.log("clean up in home screen");
    //     }  
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(fetchHistory())
    //     return () => {
    //         console.log("clean up in home screen");
    //     } 
    // }, [histories])

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
                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', paddingRight: 10}}
                    onPress={() => {
                        navigation.replace('Login')
                    }}>
                        <Image source={require('../../assets/logout.png')} style={{ width: 30, height: 30, marginRight: 5}} />
                        <Text style={{ color: '#fff', fontFamily: 'Quicksand_700Bold', fontSize: 20}}>Logout</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.headerFont}>Welcome, {user.name}</Text>
                    <Text style={styles.headerFont}>Have a nice day!</Text>
                </View>
                <View style={{ height: (height - 160) * 0.4, justifyContent: 'center'}}>
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
                        </View>}
                    </View>
                {!sortedHistories ? <ActivityIndicator size="large" color="#dfe6e9"/> :
                <View style={styles.flatListContainer}>
                        <View>
                            <Text style={{ color: '#555555', fontSize: 25, padding: 10, fontFamily:'Quicksand_700Bold'}}>Your task history</Text>
                        </View>
                        <ScrollView>
                            {sortedHistories.map((item, index) => (
                                <View key={index} style={styles.itemContainer}>
                                    <Text style={{ color: '#555555', fontSize: 20, padding: 5, fontFamily:'Quicksand_700Bold'}}>{item.date}</Text>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Image source={require('../../assets/check.png')} style={{ width: 30, height: 30}} />
                                        <Text style={{padding: 5, color: '#2ECC71', fontSize: 20, fontFamily:'Quicksand_700Bold'}}>Complete</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>                                          
                                        <View style={{ flexDirection: 'row'}}>
                                            <TouchableOpacity 
                                            style={[styles.button, {marginRight: 5, marginLeft: 5}]}
                                            onPress={() => {
                                                navigation.navigate('History', { item })
                                            }}>
                                                <Text style={{color: '#fff', fontFamily:'Quicksand_700Bold'}}>Detail</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
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
    },
    flatListContainer: {
        height: (height - 160) * 0.55,
        width: width - 10
    },
    itemContainer: {
        marginBottom: 15,
        marginHorizontal: 10,
        backgroundColor: '#f6f5f5',
        borderRadius: 5,
        borderColor: '#7f8c8d',
        padding: 10,
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
          width: 0,
          height: 10
        }
    },
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


export default HomeScreen