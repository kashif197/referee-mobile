import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

function POCScreen({ route, navigation }) {
    console.log(route.params.email)
    const [title, setTitle] = React.useState('')
    const [number, setNumber] = React.useState('')
    const [designation, setDesignation] = React.useState('')

    return (
        <View style={styles.mainContainer}>
            <View>
                <View style={styles.labelContainer}>
                    <Text style={styles.header}>Almost there!</Text>
                    <Text style={styles.subheader}>Just a few more steps.</Text>
                </View>
                <View style={styles.formContainer}>
                    <Input
                        placeholder='Business Title'
                        onChangeText={value => setTitle(value)}
                    />
                    <Input
                        placeholder='Contact Number'
                        onChangeText={value => setNumber(value)}
                    />
                    <Input
                        placeholder='Contact Designation'
                        onChangeText={value => setDesignation(value)}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title='Continue'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        fetch('http://192.168.10.4:5000/user/signup', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                customer: false,
                                title: title,
                                username: route.params.username,
                                email: route.params.email,
                                password: route.params.password,
                                designation: designation,
                                contact: number
                            })
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.status) {
                                    alert('Account Created')
                                    navigation.navigate('Login')
                                }
                                else alert(data.message)
                            })
                            .catch(err => console.log(err))

                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    labelContainer: {
        marginTop: 100,
        marginLeft: 40,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    subheader: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#909090'
    },
    formContainer: {
        width: 330,
        marginTop: 40,
        marginLeft: 30
    },
    buttonContainer: {
        marginBottom: 15,
        width: 320,
        marginLeft: 40
    },
    buttonStyle: {
        backgroundColor: '#2EC4B6'
    }
})

export default POCScreen