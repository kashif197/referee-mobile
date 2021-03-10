import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, SocialIcon } from 'react-native-elements';
import * as Google from "expo-google-app-auth"
import * as Facebook from 'expo-facebook';

function LoginScreen({ navigation }) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;  // Email Regex

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')    // Form Inputs
    const [error, setError] = React.useState(false)  // Input Valdiation

    const [signedIn, setSignedIn] = React.useState(false)  // Login Status
    const [name, setName] = React.useState('')
    const [photoURL, setPhotoURL] = React.useState('')
    const [userData, setUserData] = React.useState('')

    useEffect(
        () => {
            if (userData !== '') navigation.navigate('Profile', { token: userData.token, id: userData.id, title: userData.title, username: userData.username, email: userData.email, designation: userData.designation, contact: userData.contact })
        },
        [userData],
    );

    function signInLocal() {
        fetch('http://192.168.10.4:5000/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 0) {
                    alert(data.message)
                }
                else {
                    setUserData({
                        status: data.status,
                        title: data.title,
                        id: data.id,
                        token: data.token,
                        email: data.email,
                        username: data.username,
                        contact: data.contact,
                        designation: data.designation,
                    })
                }

            })
            .catch(err => console.log('There was no response from the server.'))
    }


    async function signInWithGoogleAsync() {        // OAuth Sign In
        try {
            const result = await Google.logInAsync({
                androidClientId: '285468949208-artesopbhrnf52hv5puqks1jlgqibaae.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                fetch("http://192.168.10.4:5000/admin/checkEmail", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: result.user.email
                    }),
                })
                    .then((res) => res.json())
                    .then((Json) => {
                        console.log(Json)
                        if (Json.email === false) {
                            navigation.navigate('Create', { result })
                        }
                        else {
                            navigation.navigate('Profile', { result: result, id: Json.data._id, token: Json.token, title: Json.data.title, username: Json.data.username, email: Json.data.email, designation: Json.data.designation, contact: Json.data.contact })
                        }

                    })
                    .catch((err) => console.log(err));
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    async function logIn() {
        try {
            await Facebook.initializeAsync({ appId: '929246954513285', appName: 'referee' });
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name`);
                const userInfo = await response.json()
                fetch("http://192.168.10.4:5000/admin/checkEmail", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: userInfo.email
                    }),
                })
                    .then((res) => res.json())
                    .then((Json) => {
                        if (Json.email === false) {
                            navigation.navigate('Create', { name: userInfo.name, email: userInfo.email })

                        }
                        else {
                            navigation.navigate('Profile', { token: Json.token, id: Json.id, title: Json.data.title, username: Json.data.username, email: Json.data.email, designation: Json.data.designation, contact: Json.data.contact })

                        }

                    })
                    .catch((err) => console.log(err));
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
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
                        <Text style={styles.forgot} onPress={() => navigation.navigate('Email')}>Create Account</Text>
                    </View>
                </View>
            </View>
            <View>
                <Button
                    title='Sign In'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        if (email === '') alert('Please enter a valid email.')
                        else if (password === '') alert('Please enter your respective password.')
                        else signInLocal()
                    }}
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
                        onPress={logIn}
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
        marginTop: 5,
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