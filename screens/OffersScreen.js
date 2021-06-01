import React, { useEffect } from 'react';
import { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Card, Image, Icon } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';
import { FAB } from 'react-native-elements';

function OfferScreen({ route, navigation }) {

    const [offers, setOffers] = React.useState('')
    const { data } = useContext(LoginContext)


    function deleteOffer(token, id) {
        fetch("http://192.168.10.13:5000/offer/deleteOffer/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((res) => res.json())
            .then((Json) => {
                if (Json.success) {
                    alert('Offer Deleted')
                    getOffers(data.id, data.token)
                }

            })
            .catch((err) => console.log(err));
    }

    function getOffers(id, token) {
        fetch('http://192.168.10.13:5000/offer/find/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(Json => {
                setOffers(Json)
            })
            .catch(err => console.log(err))
    }

    if (offers === '') {
        getOffers(data.id, data.token)


        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, alignItems: 'center', marginHorizontal: 20 }}>
                <Text style={styles.menuHeader}>My Offers</Text>
                <Button
                    icon={
                        <Icon
                            name='add-circle'
                            type='ionicon'
                            color='#fff'
                        />
                    }
                    title=" Add Offer"
                    buttonStyle={styles.button}
                    onPress={() => navigation.navigate('AddOffer', { token: data.token, id: data.id })}
                />

            </View>
        )
    }

    else {
        return (
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, alignItems: 'center', marginHorizontal: 20 }}>
                    <Text style={styles.menuHeader}>My Offers</Text>
                    <Button
                        icon={
                            <Icon
                                name='add-circle'
                                type='ionicon'
                                color='#fff'
                            />
                        }
                        title=" Add Offer"
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate('AddOffer', { token: data.token, id: data.id })}
                    />

                </View>
                <View style={styles.mainContainer}>
                    {/* <Button
                        buttonStyle={{ width: 120, backgroundColor: '#2EC4B6', marginTop: 40, alignSelf: 'center' }}
                        title='Add Offer'
                        onPress={() => { 
                            navigation.navigate('AddOffer', { token: data.token, id: data.id }) 
                            }}
                    /> */}
                    {offers.map(item => (
                        <Card key={item._id} containerStyle={{ elevation: 0, borderWidth: 0, marginTop: 40 }}>
                            <Image style={{ width: 400, height: 150 }} source={require('../images/referee-web-bg.png')} />
                            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: 'bold', color: '#000' }}>
                                {item.headline}
                            </Text>
                            <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold', color: '#909090' }}>
                                {item.description}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button
                                    buttonStyle={{ width: 80, backgroundColor: '#2EC4B6', }}
                                    title='Edit'
                                    onPress={() => { navigation.navigate('Edit', { token: data.token, id: item._id, name: item.campaign_name, headline: item.headline, description: item.description }) }}
                                />
                                <Icon
                                    name='trash-outline'
                                    type='ionicon'
                                    iconStyle={{ marginHorizontal: 10, marginTop: 5 }}
                                    onPress={() => deleteOffer(data.token, item._id)}
                                />
                            </View>
                        </Card>
                    ))}
                </View>

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    menuHeader: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#2EC4B6',
        width: 120,
        borderRadius: 20
    },
})

export default OfferScreen