import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Card, Button, Input, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginContext } from '../contexts/LoginContext';

function AddCredit({ navigation }) {
    const { data } = useContext(LoginContext)
    const [amount, handleAmount] = React.useState('')
    const [cardNumber, handleCardNumber] = React.useState('')
    const [expiry, handleExpiry] = React.useState('')
    const [cvc, handleCVC] = React.useState('')

    function handleTransaction() {
        fetch('http://192.168.10.13:5000/payment/stripeTransaction', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount,
                receipt_email: data.email,
                business_username: data.username,
                description: ''
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    alert('Transaction Success!')
                    navigation.navigate('Offers', { screen: 'Finance' })
                }
            })
    }

    return (
        <View style={styles.mainContainer}>

            <Input
                placeholder='Amount'
                onChangeText={value => handleAmount(value)}
            />
            <Input
                placeholder='Card Number'
                onChangeText={value => handleCardNumber(value)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Input
                    placeholder='Expiry Date'
                    onChangeText={value => handleExpiry(value)}
                    containerStyle={{ width: 150 }}
                />
                <Input
                    placeholder='CVC'
                    secureTextEntry={true}
                    onChangeText={value => handleCVC(value)}
                    containerStyle={{ width: 100, marginRight: 20 }}
                />
            </View>

            <Button
                title="Proceed"
                buttonStyle={styles.button}
                titleStyle={{ color: '#fff', fontWeight: 'bold' }}
                onPress={() => {
                    handleTransaction()
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2EC4B6',
        width: 300,
        alignSelf: 'center'
    },
})

export default AddCredit