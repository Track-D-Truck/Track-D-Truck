import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';


export default function CustomHeader({ customStyles }) {
    return (
      <View style={{
        position: 'absolute',
        width: Dimensions.get('window').width
      }}>
        <View style={{ backgroundColor: '#27ae60', height: 160 }}>
          <Svg
            height="60%"
            width="100%"
            viewBox="0 0 1440 320"
            style={{ position: 'absolute', top: 130 }}
          >
            <Path
              fill="#27ae60"
              d="M0,256L120,256C240,256,480,256,720,229.3C960,203,1200,149,1320,122.7L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
    );
  }