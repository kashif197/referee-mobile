import React, { useContext } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text, Card, Button, Icon, Header } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';

function FinanceScreen({ navigation }) {
    const { data } = useContext(LoginContext)
    const [balance, setBalance] = React.useState('')
    const [totalOffers, setTotalOffers] = React.useState('')
    const [totalAvailedOffers, setTotalAvailedOffers] = React.useState('')
    const [totalRedeemedOffers, setTotalRedeemedOffers] = React.useState('')

    const getStats = () => {
        fetch('http://192.168.10.13:5000/analytics/getBalance/' + data.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) setBalance(data.data)
            })
        fetch('http://192.168.10.13:5000/analytics/getTotalOffers/' + data.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) setTotalOffers(data.data)
            })
        fetch('http://192.168.10.13:5000/analytics/getTotalAvailedOffers/' + data.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) setTotalAvailedOffers(data.data)
            })
        fetch('http://192.168.10.13:5000/analytics/getTotalRedeemedOffers/' + data.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) setTotalRedeemedOffers(data.data)
            })
    }

    if (balance !== '') {

        return (
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:40, alignItems: 'center', marginHorizontal: 20}}>
                    <Text style={styles.menuHeader}>Finances</Text>
                    <Icon
                        name='refresh-outline'
                        type='ionicon'
                        color='#2ec4b6'
                        onPress={() => getStats()}
                    />
                </View>
                <View style={styles.mainContainer}>
                    {/* <Text style={styles.menuHeader}>Offer Statistics</Text> */}
                    <Card containerStyle={{ elevation: 0, borderWidth: 0, marginTop: 10 }} wrapperStyle={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* <Image style={{ width: 400, height: 150 }} source={require('../images/referee-web-bg.png')} /> */}
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold', color: '#000' }}>
                                Balance
                    </Text>
                            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 25, fontWeight: 'bold', color: '#2EC4B6' }}>
                                {balance}
                            </Text>
                            <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold', color: '#000' }}>
                                Transactions
                    </Text>
                            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 25, fontWeight: 'bold', color: '#909090' }}>
                                20
                    </Text>
                        </View>
                        <View style={{ marginRight: 40 }}>
                            <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold', color: '#000' }}>
                                Offers Availed
                    </Text>
                            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 25, fontWeight: 'bold', color: '#909090' }}>
                                {totalAvailedOffers}
                            </Text>
                            <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold', color: '#000' }}>
                                Redeemed
                    </Text>
                            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 25, fontWeight: 'bold', color: '#909090' }}>
                                {totalRedeemedOffers}
                            </Text>
                        </View>
                    </Card>

                    <Text style={styles.menuSecondHeader}>Top Offers</Text>


                    <Button
                        title="Add Credit"
                        buttonStyle={styles.button}
                        titleStyle={{ color: '#fff', fontWeight: 'bold' }}
                        onPress={() => {
                            navigation.navigate('Add')
                        }}
                    />
                </View>
            </View>
        );
    }
    else {
        getStats()
        return (
            <View style={styles.startLoad}>
                <ActivityIndicator size="large" color="#2EC4B6" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
    },
    menuHeader: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    menuSecondHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 20
    },
    mainFlex: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#2EC4B6',
        width: 300,
        alignSelf: 'center'
    },
    startLoad: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default FinanceScreen