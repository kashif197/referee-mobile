import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, SocialIcon, Image } from 'react-native-elements';

function EmailScreen({ navigation }) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;  // Email Regex

    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [error, setError] = React.useState(false)  // Input Valdiation

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
                <View style={styles.statsBox}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../images/referee-logo-transparent-bg.png')}
                            style={{ width: 150, height: 150 }}
                        />
                    </View>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.header}>Sign Up</Text>
                    <Text style={styles.subheader}>Enter an email for your new account.</Text>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.emailContainer}>
                        <Input
                            placeholder='Your Name'
                            onChangeText={value => setName(value)}
                        />
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

            <View style={styles.buttonContainer}>
                <Button
                    title='Continue'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        if (name === '') alert("Please enter your name before proceeding.")
                        else if (email === '' || error === true) alert('Please enter a valid email before proceeding.')
                        else navigation.navigate('Create', { name: name, email: email })
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
    },
    header: {
        fontSize: 30,
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
    emailContainer: {
        width: 350,
        marginTop: 40,
        alignItems: 'center',
    },
    buttonStyle: {
        backgroundColor: '#2EC4B6',
        width: 320,
        marginLeft: 40,
        marginBottom: 20
    },
    statsBox: {
        backgroundColor: '#2EC4B6',
        height: 300,
        borderBottomLeftRadius: 2000,
    },
})

export default EmailScreen