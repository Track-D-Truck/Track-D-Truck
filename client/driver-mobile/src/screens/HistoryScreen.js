import React from 'react'
import {     
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image
} from 'react-native'
import {
    useFonts,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { AppLoading } from 'expo'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const HistoryScreen = ({route, navigation }) => {

    const { item } = route.params

    const [fontsLoaded] = useFonts({
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold
      });
    if (!fontsLoaded) {
        return <AppLoading/>
    }else{
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{ color: '#555555', fontSize: 30, padding: 15, fontFamily:'Quicksand_700Bold'}}>{item.date}</Text>
                </View>
                <ScrollView>
                {item.routes.map(item => (
                    <View key={item.name} style={styles.itemContainer}>
                        <Text style={{ color: '#555555', fontSize: 20, padding: 5, fontFamily:'Quicksand_700Bold'}}>{item.name}</Text>
                        <Text style={{padding: 5, fontFamily: 'Quicksand_500Medium'}}>{item.address}</Text>
                        <View style={{ flexDirection: 'row'}}>
                            <Image source={require('../../assets/check.png')} style={{ width: 30, height: 30}} />
                            <Text style={{padding: 5, color: '#2ECC71', fontSize: 20, fontFamily:'Quicksand_700Bold'}}>Done</Text>
                        </View>
                    </View>
                ))}
                </ScrollView>
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

export default HistoryScreen