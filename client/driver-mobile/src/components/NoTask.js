import React from 'react';
import { Text, View, Image } from 'react-native';

export default function NoTask() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/search.png')} style={{ width: 150, height: 150}} />
            <Text style={{ fontFamily: 'Quicksand_700Bold', fontSize: 30, color: '#555555'}}>No task available</Text>
        </View>
    )
}