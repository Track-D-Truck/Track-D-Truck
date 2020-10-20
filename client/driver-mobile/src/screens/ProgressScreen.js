import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {     
    View,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native'
import FlatlistItem from '../components/FlatlistItem'

const { width, height } = Dimensions.get('window');

const ProgressScreen = ({ navigation }) => {
    const result = useSelector(state => state.resultReducer.result)
    const [truckData, setTruckData] = useState(null)
    useEffect(() => {
        setTruckData(result.truck)
    }, [result])
    return (
        <View style={styles.container}>
            {/* <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={styles.headerFont}>Progress</Text>
            </View> */}
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
        borderWidth: 1,
        backgroundColor: '#FFF8CD',
        borderRadius: 5,
        height: 170,
        borderColor: '#7f8c8d'
    }
  });

export default ProgressScreen