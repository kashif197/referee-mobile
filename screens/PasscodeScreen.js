import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, Image } from 'react-native-elements';

function PasscodeScreen({ route, navigation }) {

    const [passcode, setPasscode] = React.useState('')
    const [error, setError] = React.useState(false)  // Input Valdiation

    const validatePasscode = () => {
        fetch('http://192.168.10.15:5000/user/check-token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: route.params.email,
                token: passcode
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                navigation.navigate('NewPassword', {email: route.params.email})
            }
        })
    }

    return (
        <View style={styles.topContainer}>
            <View>
                <View>
                    <Text style={styles.header}>Enter Passcode</Text>
                    <Text style={styles.subheader}>We have sent a passcode to your email address.</Text>
                </View>
                <View style={styles.mainContainer}>

                    <View style={styles.formContainer}>
                        <Input
                            placeholder='Enter Passcode'
                            onChangeText={value => setPasscode(value)}
                            error={error}
                            errorMessage={error ? "Incorrect Passcode." : ""}
                        />
                    </View>
                </View>
            </View>
            <View>
                <Button
                    title='Verify'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        if (passcode === '') alert('Please enter the passcode sent to your email.')
                        else {
                            validatePasscode(passcode)
                        }
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    mainContainer: {
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 30,
        marginTop: 100,
        marginLeft: 40,
        fontWeight: 'bold'
    },
    subheader: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 40,
        fontWeight: 'bold',
        color: '#909090'
    },
    formContainer: {
        width: 350,
        marginTop: 40,
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#2EC4B6',
        width: 330,
        marginLeft: 40,
        marginBottom: 20
    }
})


export default PasscodeScreen
