import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {     
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text
} from 'react-native'
import FlatlistItem from '../components/FlatlistItem'
import NoTask from '../components/NoTask'

const { width, height } = Dimensions.get('window');

const ProgressScreen = ({ navigation }) => {
    const result = useSelector(state => state.resultReducer.result)
    const [truckData, setTruckData] = useState(null)
    useEffect(() => {
        if(result){
            setTruckData(result.truck)
        }        
    }, [result])
    return (
        <View style={styles.container}>
            {/* <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={styles.headerFont}>Progress</Text>
            </View> */}
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
        </View>
            }

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
        height: 190,
        borderColor: '#7f8c8d',
        padding: 10,
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
          width: 0,
          height: 10
        }
    }
  });

export default ProgressScreen