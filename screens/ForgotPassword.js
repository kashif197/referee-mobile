import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, Image } from 'react-native-elements';

function ForgotPassword({ route, navigation }) {

    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState(false)  // Input Valdiation

    const requestChange = () => {
        fetch('http://192.168.10.15:5000/user/reset-password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        })
        // .then(res => res.text())
        // .then(Json => console.log(Json))
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status) {
                navigation.navigate('Passcode', {email: email})
            }
        })
    }


    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;  // Email Regex

    const validateEmail = (email) => {
        if (emailRegex.test(email)) {
            setError(false)
            return true
        }
        else setError(true)
    }


    return (
        <View style={styles.topContainer}>
            <View>
                <View>
                    <Text style={styles.header}>Forgot Password</Text>
                    <Text style={styles.subheader}>Please enter your email to reset your password.</Text>
                </View>
                <View style={styles.mainContainer}>

                    <View style={styles.formContainer}>
                        <Input
                            placeholder='Email Address'
                            onChangeText={value => setEmail(value)}
                            error={error}
                            errorMessage={error ? "Please enter a valid email." : ""}
                            onBlur={() => validateEmail(email)}
                        />
                    </View>
                </View>
            </View>
            <View>
                <Button
                    title='Reset Password'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        if (email === '') alert('Please enter a valid email.')
                        else {
                            requestChange()
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


export default ForgotPassword
