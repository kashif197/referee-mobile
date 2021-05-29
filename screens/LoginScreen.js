import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, SocialIcon } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';



function LoginScreen({ navigation }) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;  // Email Regex

    const [email, setEmail] = React.useState('') // Form Inputs
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(false)  // Input Valdiation


    const { data, signInLocal, signInWithGoogleAsync, logIn } = useContext(LoginContext) // State Context For User Information

    // Navigate After Data Is Updated
    useEffect(
        () => {
            if (data !== '') {
                navigation.navigate('Offers')
            }
        },
        [data],
    );

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
                        <Text style={styles.forgot} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
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
                        else {
                            signInLocal(email, password)
                        }
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