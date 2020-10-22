import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Image
  } from 'react-native'
  import {
    useFonts,
    Quicksand_500Medium,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { AppLoading } from 'expo'
const { width, height } = Dimensions.get('window');

import { loginAccount } from '../store/actions/userAction'

const LoginScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        Quicksand_500Medium,
        Quicksand_700Bold
      });

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const user = useSelector(state => state.userReducer)

    const dispatch = useDispatch()

    const login = () => {
        dispatch(loginAccount(userData))
        navigation.replace('Loading')     
        setUserData({
            email: '',
            password: ''
        })
    }
    if (!fontsLoaded) {
        return <AppLoading/>
    }else{
        return (
            <View style={styles.container}>
                <View style={{ padding: 30, flexDirection: 'row'}}>
                    <Image source={require('../../assets/logo.png')} style={{ width: 100, height: 100}} />
                    <View>
                        <Text style={[styles.headerFont, {fontFamily: 'Quicksand_700Bold'}]}>Track</Text>
                        <Text style={[styles.headerFont, {fontFamily: 'Quicksand_700Bold'}]}>D' Truck</Text>
                    </View>                    
                </View>
                <View style={styles.formContainer}>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text style={[styles.headerFont, {fontFamily: 'Quicksand_700Bold'}]}>Welcome</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={[styles.lable, {fontFamily: 'Quicksand_700Bold'}]}>Email</Text>
                        <TextInput
                            placeholder="Email"
                            style={[styles.formInput, {fontFamily: 'Quicksand_500Medium'}]}
                            value={userData.email}
                            onChangeText={(text => {
                                setUserData({
                                    ...userData,
                                    email: text
                                })
                            })}/>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={[styles.lable, {fontFamily: 'Quicksand_700Bold'}]}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            style={[styles.formInput, {fontFamily: 'Quicksand_500Medium'}]}
                            value={userData.password}
                            onChangeText={(text => {
                                setUserData({
                                    ...userData,
                                    password: text
                                })
                            })}/>
                    </View>
                    <View style={{ padding: 30, alignItems: 'center' }}>
                        <TouchableOpacity
                            style={[styles.button, {fontFamily: 'Quicksand_700Bold'}]}
                            onPress={login}>
                                <Text style={styles.fontWhite}>
                                    Login
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    formContainer: {
        justifyContent: 'center',
        width: width - 100,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
          width: 0,
          height: 4
        }
    },
    headerFont: {
        fontSize: 30,
        letterSpacing: 0.15,
        color: '#555555'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 100,
        backgroundColor: '#27ae60',
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
        fontWeight: 'bold',
        color: 'white'
    },
    formInput: {
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#b2bec3',
        // fontWeight: 'bold',
        // fontSize: 20,
        backgroundColor: '#fff'
    },
    lable: {
        fontSize: 20,
        color: '#555555'
    }
  });

export default LoginScreen