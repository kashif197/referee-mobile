import React, { useContext, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Linking } from 'react-native';
import { Button, Text, Avatar, ListItem, Icon } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';

function RecordScreen() {
    const [payments, setPayments] = React.useState('')
    const { data } = useContext(LoginContext)

    function getPayments() {
        fetch('http://192.168.10.15:5000/payment/getTransactionRecords', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                receipt_email: data.email
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setPayments(data.data)
                }
            })
    }

    if (payments === '') {
        getPayments()


        return (
            <View><Text>Hello</Text>
            </View>
        )
    }

    else {
        return (
            <ScrollView style={{ marginTop: 40 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.menuHeader}>Transaction Date</Text>
                    <Text style={{
                        marginVertical: 20,
                        marginLeft: 15,
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginRight: 25
                    }}>Amount</Text>
                </View>
                {payments.map(item => (
                    <ListItem key={item.paymentId} bottomDivider onPress={() => Linking.openURL(item.receipt_url)}>
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold' }}>{item.dateCreated}</ListItem.Title>
                        </ListItem.Content>
                        <Text style={{ fontSize: 16, color: '#707070' }}>{"PKR " + item.amount}</Text>
                        <Icon
                            name="chevron-forward-outline"
                            type='ionicon'
                            color='#707070'
                        />
                    </ListItem>
                ))}
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    menuHeader: {
        marginVertical: 20,
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 20
    },
})

export default RecordScreen