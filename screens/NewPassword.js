import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, Image } from 'react-native-elements';

function NewPassword({ route, navigation }) {

    const [password, setPassword] = React.useState('')

    const newPass = () => {
        fetch('http://192.168.10.15:5000/user/new-password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: route.params.email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                alert('Password Updated')
                navigation.navigate('Login')
            }
        })
    }

    return (
        <View style={styles.topContainer}>
            <View>
                <View>
                    <Text style={styles.header}>Success!</Text>
                    <Text style={styles.subheader}>Please enter your new Password.</Text>
                </View>
                <View style={styles.mainContainer}>

                    <View style={styles.formContainer}>
                        <Input
                            placeholder='New Password'
                            onChangeText={value => setPassword(value)}
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
                        if (password === '') alert('Please enter a valid password.')
                        else {
                            navigation.navigate('Login')
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


export default NewPassword
