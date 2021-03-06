import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    Dimensions,
    StyleSheet,
    Image,
    View,
    Text,
    Linking,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import { setNextDestination } from '../store/actions/positionAction'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -6.86666;
const LONGITUDE = 107.60000;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({ waypoints }) => { 

    const dispatch = useDispatch()
    const [count, setCount] = useState(-1)
    const currentPosition = useSelector(state => state.positionReducer.currentPosition)
    const origin = useSelector(state => state.positionReducer.startPosition)
    const destination = useSelector(state => state.positionReducer.lastDestination)
    console.log(currentPosition, "<<< current position");
    
    useEffect(() => {
        if(count < waypoints.length){
            dispatch(setNextDestination(waypoints[count + 1]))
            setCount(count + 1)            
            console.log("Count ke-", count)
        }
        if(count === waypoints.length){
            setCount(-1)
        }
        return () => {
            console.log("clean up in map component");
        }  
    }, [currentPosition])

    const getDirection = (coordinate) => {
        Linking.openURL(`http://www.google.com/maps/dir/${currentPosition.latitude},${currentPosition.longitude}/${coordinate.latitude},${coordinate.longitude}`)
    }

    return (
        <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }}>
            <MapView.Marker coordinate={origin}>
                <MapView.Callout onPress={() => {
                    goDirection(origin)
                    }}>
                    <View>
                        <Text style={{ fontFamily: 'Quicksand_700Bold'}}>
                            Pool
                        </Text>
                        <Text style={{ fontFamily: 'Quicksand_500Medium'}}>
                            Click to get direction
                        </Text>
                    </View>
                </MapView.Callout>
            </MapView.Marker>
            <MapView.Marker coordinate={destination}>
                <MapView.Callout onPress={() => {
                    goDirection(destination)
                    }}>
                    <View>
                        <Text style={{ fontFamily: 'Quicksand_700Bold'}}>
                            Garbage Dump Center
                        </Text>
                        <Text style={{ fontFamily: 'Quicksand_500Medium'}}>
                            Click to get direction
                        </Text>
                    </View>
                </MapView.Callout>
            </MapView.Marker>
            <Marker coordinate={currentPosition}>
                    <Image source={require('../../assets/trash-truck.png')} style={{ width: 50, height: 50}} />
            </Marker>
            {waypoints.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate}>
                <MapView.Callout onPress={() => {
                                getDirection(coordinate)
                            }}>
                    <View style={styles.callout}>
                        <Text style={{ fontFamily: 'Quicksand_700Bold'}}>
                            {`#${index+1}${coordinate.name}`}
                        </Text>
                        <Text style={{ fontFamily: 'Quicksand_500Medium'}}>
                            {coordinate.address}
                        </Text>
                        <TouchableOpacity style={styles.btnOpenMap} >
                            <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'Quicksand_700Bold'}}>Get direction</Text>
                        </TouchableOpacity>
                    </View>
                </MapView.Callout>
            </MapView.Marker>
            )}
              <MapViewDirections
                origin={currentPosition}
                waypoints={waypoints}
                destination={destination}
                apikey="AIzaSyAK0QXUj4Jet4cJnWWV9nE1e62CbXPAcsc"
                strokeWidth={3}
                strokeColor="#27ae60"
                mode="DRIVING"
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map:  {
        height,
        width
    },
    callout: {
        height: '100%',
        width: 150
    },

    btnOpenMap: { 
        borderRadius: 5,
        width: 110,
        padding: 10,
        backgroundColor: '#e91e63',
        marginTop: 5,
    }
})

export default Map