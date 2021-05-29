import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';

function RequestSupport({navigation }) {

    const [session, setSession] = React.useState('')

    useEffect(() => {
        if (session !== '') navigation.navigate('Support', {session_id: session})
    }, [session]);

    const requestSession = () => {
        fetch('http://192.168.10.13:5000/watson/session', {
            method: 'GET',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({
            //     email: email,
            //     password: password
            // })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setSession(data.session_id)
        })
    }

    return (
        <View style={styles.startLoad}>
            <Button
                title="Request Support"
                buttonStyle={styles.button}
                titleStyle={{ color: '#2EC4B6' }}
                onPress={() => {
                    requestSession()
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        width: 300
    },
    startLoad: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2ec4b6'
    },
});

export default RequestSupport