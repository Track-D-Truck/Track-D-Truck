import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {     
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native'
import {
    useFonts,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { AppLoading } from 'expo'
import FlatlistItem from '../components/FlatlistItem'
import NoTask from '../components/NoTask'
import { resetResult } from '../store/actions/resultAction'
import { resetPosition } from '../store/actions/positionAction'
import { updateAllHistory } from '../store/actions/historyAction'

const { width, height } = Dimensions.get('window');

const ProgressScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        Quicksand_700Bold,
      });

    const dispatch = useDispatch()
    const [truckData, setTruckData] = useState(null)
    const result = useSelector(state => state.resultReducer.result)
    const updatedPosition = useSelector(state => state.positionReducer.updatedPosition)
    
    useEffect(() => {
        if(result){
            setTruckData(result.truck)
        }  
        return () => {
            console.log("clean up in progress screen");
        }      
    }, [result])

    const finishTask = () => {
        dispatch(updateAllHistory())
        dispatch(resetResult())
        dispatch(resetPosition())
        navigation.replace('Home Page')
    }
    if (!fontsLoaded) {
        return <AppLoading/>
    }else{
        return (
            <View style={styles.container}>
                {!result ? 
                <NoTask/>:
                <View style={styles.flatListContainer}>
                <FlatList
                data={result.route}
                keyExtractor={route => route.location}
                renderItem={({ item })  => {
                    return (
                    <View style={styles.itemContainer}>
                        < FlatlistItem item={item} truckData={truckData}/>
                    </View>
                    )
                }}/>
                {result.route.length === updatedPosition.length &&
                <View>
                    <TouchableOpacity 
                    style={[styles.button, {marginTop: 5}]}
                    onPress={() => {
                        finishTask()
                    }}>
                        <Text style={styles.fontWhite}>Finish</Text>
                    </TouchableOpacity>
                </View>}
                </View>}

            </View>
        )
    }
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
    },
    flatListContainer: {
        height: height - 200,
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
        paddingVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#e91e63',
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
        color: 'white',
        fontSize: 20,
        fontFamily: 'Quicksand_700Bold'
    }
  });

export default ProgressScreen