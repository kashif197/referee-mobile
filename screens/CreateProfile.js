import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, SocialIcon } from 'react-native-elements';

function CreateProfile({ navigation }) {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [usernameError, setUsernameError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)

    function validateUsername(username) {
        fetch("http://192.168.10.6:5000/admin/checkUsername", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
            }),
        })
            .then((res) => res.json())
            .then((Json) => {
                if (Json.username) {
                    setUsernameError(true)
                }
                else {
                    setUsernameError(false)
                }

            })
            .catch((err) => console.log(err));
    }

    function validatePassword(password, confirmPassword) {
        if (password === confirmPassword) setPasswordError(false)
        else setPasswordError(true)
    }


    return (
        <View style={styles.mainContainer}>
            <View>
                <View style={styles.labelContainer}>
                    <Text style={styles.header}>Welcome Name</Text>
                    <Text style={styles.subheader}>Let's create a profile for you.</Text>
                </View>
                <View style={styles.formContainer}>
                    <Input
                        placeholder='Username'
                        onChangeText={value => setUsername(value)}
                    error={usernameError}
                    errorMessage={usernameError ? "Username must be unique." : ""}
                    onBlur={() => validateUsername(username)}
                    />
                    <Input
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={value => setPassword(value)}
                    />
                    <Input
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                        onChangeText={value => setConfirmPassword(value)}
                        onBlur={() => validatePassword(password, confirmPassword)}
                        error={passwordError}
                        errorMessage={passwordError ? "Passwords do not match." : ""}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title='Continue'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
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

export default CreateProfile