import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading({ navigation }) {

  setTimeout(() => {
    navigation.replace('Home')
  }, 3000)

    return (
      <View style={styles.container}>
          <LottieView
            source={require('./truck-loading.json')} autoPlay loop
            style={{
                height: 200,
                width: 200
          }}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});