import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Dimensions, StyleSheet, Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
// import GOOGLE_MAPS_APIKEY from '../../gmapskey'
import { positionReducer } from '../store/reducers/positionReducer';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -6.86666;
const LONGITUDE = 107.60000;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({ waypoints }) => { 
    console.log(waypoints, "<<< ini waypoints");

    const currentPosition = useSelector(state => state.positionReducer.currentPosition)
    const origin = useSelector(state => state.positionReducer.startPosition)
    const destination = useSelector(state => state.positionReducer.lastDestination)

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
            <MapView.Marker coordinate={origin} title="Pool" description="start here" />
            <MapView.Marker coordinate={destination} title="Finish" description="last garbage dump"/>
            <Marker coordinate={currentPosition} title="Current position">
                    <Image source={require('../../assets/trash-truck.png')} style={{ width: 50, height: 50}} />
            </Marker>
            {waypoints.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} title={coordinate.name}/>
            )}
              <MapViewDirections
                origin={origin}
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
        height: height - 400,
        width
    }
})

export default Map