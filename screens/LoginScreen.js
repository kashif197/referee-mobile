import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, SocialIcon } from 'react-native-elements';
import * as Google from "expo-google-app-auth"

function LoginScreen({ navigation }) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;  // Email Regex

    const [email, setEmail] = React.useState('')  
    const [password, setPassword] = React.useState('')    // Form Inputs
    const [error, setError] = React.useState(false)  // Input Valdiation

    const [signedIn, setSignedIn] = React.useState(false)  // Login Status
    const [name, setName] = React.useState('')
    const [photoURL, setPhotoURL] = React.useState('')



    async function signInWithGoogleAsync() {        // OAuth Sign In
        try {
            const result = await Google.logInAsync({
                androidClientId: '285468949208-artesopbhrnf52hv5puqks1jlgqibaae.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log(result.user)
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

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
                    <Text style={styles.header}>Login</Text>
                    <Text style={styles.subheader}>Please sign in to continue.</Text>
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
                        <Input
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={value => setPassword(value)}
                        />
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </View>
                </View>
            </View>
            <View>
                <Button
                    title='Sign In'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                />
                <Text style={styles.or}>or login with</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                    <SocialIcon
                        type="google"
                        button
                        style={{ width: 50 }}
                        onPress={signInWithGoogleAsync}
                    />
                    <SocialIcon
                        type="facebook"
                        button
                        style={{ width: 50 }}
                    />
                </View>
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
    forgot: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#909090'
    },
    buttonStyle: {
        backgroundColor: '#2EC4B6',
        width: 330,
        marginLeft: 40,
        marginTop: 20
    },
    or: {
        fontSize: 18,
        color: '#909090',
        textAlign: 'center',
        marginTop: 15
    },
    signInButton: {
        width: 200,
        height: 30,
        borderRadius: 30
    },
    signInText: {
        color: '#fff',
        fontWeight: "bold",
        textAlign: 'center',
        paddingTop: 5,
    }
});


export default LoginScreen