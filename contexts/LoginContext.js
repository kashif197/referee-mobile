import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import * as Google from "expo-google-app-auth"
import * as Facebook from 'expo-facebook';

export const LoginContext = createContext()

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (err) {
        console.log(err)
    }
};

const LoginContextProvider = (props) => {

    const [data, setData] = useState('')

    const resetData = () => {
        setData('')
    }

    const changeData = (token, id, title, username, email, designation, contact, photoURL) =>
        setData({
            token: token,
            id: id,
            username: username,
            email: email,
            title: title,
            designation: designation,
            contact: contact,
            photoURL: photoURL
        });

    function signInLocal(email, password) {
        fetch('http://192.168.10.13:5000/user/login', {
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
            // .then(Json => console.log(Json))
            .then(data => {
                if (data.status === 0) {
                    alert(data.message)
                }
                else {
                    // Add To Async Storage
                    storeData('loggedState', 'basic')
                    storeData('email', email)
                    storeData('password', password)

                    // Update Login Context Data
                    changeData(data.token, data.id, data.title, data.username, data.email, data.designation, data.contact, '')

                }
            })
            .catch(err => console.log(err))
    }

    async function signInWithGoogleAsync() {
        // OAuth Sign In
        try {
            const value = await AsyncStorage.getItem('loggedState')
            if (value == 'no') {
                const result = await Google.logInAsync({
                    androidClientId: '285468949208-artesopbhrnf52hv5puqks1jlgqibaae.apps.googleusercontent.com',
                    scopes: ['profile', 'email'],
                });
                if (result.type === 'success') {
                    fetch("http://192.168.10.13:5000/admin/checkEmail", {
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
                        .then((data) => {
                            if (data.email === false) {
                                navigation.navigate('Create', { result })
                            }
                            else {
                                storeData('loggedState', 'oauth')
                                let newResult = JSON.stringify(result)
                                storeData('oauthResult', newResult)
                                // Update Context
                                changeData(data.token, data.data.id, data.data.title, data.data.username, data.data.email, data.data.designation, data.data.contact, result.user.photoUrl)
                            }

                        })
                        .catch((err) => console.log(err));
                } else {
                    return { cancelled: true };
                }
            }
            else {

                const newResult = await AsyncStorage.getItem('oauthResult')
                const result = JSON.parse(newResult)
                if (result.type === 'success') {

                    fetch("http://192.168.10.13:5000/admin/checkEmail", {
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
                        .then((data) => {
                            if (data.email === false) {
                                navigation.navigate('Create', { result })
                            }
                            else {
                                console.log('running')
                                changeData(data.token, data.data.id, data.data.title, data.data.username, data.data.email, data.data.designation, data.data.contact, result.user.photoUrl)
                            }

                        })
                        .catch((err) => console.log(err));
                } else {
                    return { cancelled: true };
                }

            }
        } catch (e) {
            return { error: true };
        }
    }

    async function logIn() {
        const value = await AsyncStorage.getItem('loggedState')

        if (value == 'no') {
            try {
                await Facebook.initializeAsync({ appId: '929246954513285', appName: 'referee' });
                const {
                    type,
                    token,
                    expires,
                    permissions,
                    declinedPermissions,
                } = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', 'email', 'user_photos'],
                });

                if (type === 'success') {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name`);
                    const userInfo = await response.json()
                    const photoInfo = `https://graph.facebook.com/${userInfo.id}/picture?type=square&access_token=${token}`


                    fetch("http://192.168.10.13:5000/admin/checkEmail", {
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
                        .then((data) => {
                            if (data.email === false) {
                                navigation.navigate('Create', { name: userInfo.name, email: userInfo.email })

                            }
                            else {
                                const fbData = { "type": type, "token": token, "userInfo": userInfo, "photoInfo": photoInfo }
                                let fbDataString = JSON.stringify(fbData)
                                storeData("loggedState", "fb")
                                storeData("fbData", fbDataString)
                                changeData(data.token, data.data.id, data.data.title, data.data.username, data.data.email, data.data.designation, data.data.contact, photoInfo)
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

        else {
            let fbDataString = await AsyncStorage.getItem("fbData")
            const fbData = JSON.parse(fbDataString)
            fetch("http://192.168.10.13:5000/admin/checkEmail", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: fbData.userInfo.email
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.email === false) {
                        navigation.navigate('Create', { name: fbData.userInfo.name, email: fbData.userInfo.email })

                    }
                    else {
                        changeData(data.token, data.data.id, data.data.title, data.data.username, data.data.email, data.data.designation, data.data.contact, fbData.photoInfo)
                    }

                })
                .catch((err) => console.log(err));
        }


    }


    return (
        <LoginContext.Provider value={{ data, changeData, signInLocal, signInWithGoogleAsync, logIn, resetData }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider