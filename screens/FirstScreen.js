import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';
import AsyncStorage from '@react-native-community/async-storage'

function FirstScreen({ navigation }) {

    const checkStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('loggedState');
            console.log(value)

            if (value == 'no' || value == null) {  // Not Logged In
                setLoading(false)
                setLogged(false)
            }
            else if (value == 'basic') {   // Basic Signed In
                console.log(value)

                let email = await AsyncStorage.getItem('email');
                let password = await AsyncStorage.getItem('password');
                signInLocal(email, password)
                setLoading(false)
                setLogged(true)
            }
            else if (value == 'oauth') {
                console.log(value)

                // setLoading(false)
                // setLogged(true)
                signInWithGoogleAsync()

            }
            else if (value == "fb") {
                console.log(value)
                setLoading(false)
                setLogged(true)
                logIn()
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    const [isLoading, setLoading] = React.useState(true)
    const [isLogged, setLogged] = React.useState(false)


    const { data, signInLocal, signInWithGoogleAsync, logIn, resetData, storeData } = useContext(LoginContext)

    // First Scan Of Storage
    useEffect(() => {
        checkStorage()
    }, []);

    useEffect(
        () => {
            // console.log(data)
            // if (!data.status) {
            //     console.log(data.status)
            //     console.log('here')
            //     // navigation.navigate('Create')

            // }

            if (data !== '') {
                navigation.navigate('Offers')
            }
        },
        [data],
    );




    // Initial Loading Screen
    if (isLoading == true && isLogged == false) {
        return (
            <View style={styles.startLoad}>
                <ActivityIndicator size="large" color="#2EC4B6" />
                {/* <Button
                    title='LOG OUT'
                    buttonStyle={styles.buttonStyle}
                    containerStyle={{ alignSelf: 'center' }}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        resetData()
                        clearAsyncStorage()
                        storeData('loggedState', 'no')
                        navigation.navigate('Login')
                    }}
                /> */}
            </View>
        );
    }

    else if (isLogged == true && isLoading == false) {
        return (
            <View style={styles.startLoad}>
                <ActivityIndicator size="large" color="#2EC4B6" />
                <Button
                    title='LOG OUT'
                    buttonStyle={styles.buttonStyle}
                    containerStyle={{ alignSelf: 'center' }}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        resetData()
                        AsyncStorage.clear();
                        // storeData('loggedState', 'no')
                        navigation.navigate('Login')
                    }}
                />
            </View>
        );
    }

    else {
        return (
            <View style={styles.home}>
                <Image
                    source={require('../images/referee-karobar-logo-solid-bg.png')}
                    style={{ width: 250, height: 250 }}
                />
                <Button
                    title="Get Started"
                    buttonStyle={styles.button}
                    titleStyle={{ color: '#2EC4B6' }}
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#2EC4B6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#fff',
        width: 300
    },
    startLoad: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FirstScreen