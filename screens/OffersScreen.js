import React, {useEffect} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, Button, Text, SocialIcon, Card, Image, Icon } from 'react-native-elements';

function OfferScreen({ route, navigation }) {

    const [offers, setOffers] = React.useState('')

    useEffect(
        () => {
            getOffers(route.params.id, route.params.token)
        },
        [route.params?.updatePosts, route.params.updatePosts],
    );

    function deleteOffer(token, id) {
        fetch("http://192.168.10.7:5000/offer/deleteOffer/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((res) => res.json())
            .then((Json) => {
                if (Json.success) {
                    alert('Offer Deleted')
                    getOffers(route.params.id, route.params.token)
                }

            })
            .catch((err) => console.log(err));
    }

    function getOffers(id, token) {
        fetch('http://192.168.10.7:5000/offer/find/' + id, {
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
                console.log('Res' + Json)
            })
            .catch(err => console.log(err))
    }

    if (offers === '') {
        getOffers(route.params.id, route.params.token)


        return <View></View>
    }
    else {
        return (
            <ScrollView style={styles.mainContainer}>
                <Button
                    buttonStyle={{ width: 120, backgroundColor: '#2EC4B6', marginTop: 40, alignSelf: 'center' }}
                    title='Add Offer'
                    onPress={() => { console.log(route.params.id);navigation.navigate('AddOffer', { token: route.params.token, id: route.params.id }) }}
                />
                {offers.map(item => (
                    <Card key={item.name} containerStyle={{ elevation: 0, borderWidth: 0, marginTop: 40 }}>
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
                                onPress={() => { navigation.navigate('Edit', { token: route.params.token, id: item._id, name: item.campaign_name, headline: item.headline, description: item.description }) }}
                            />
                            <Icon
                                name='trash-outline'
                                type='ionicon'
                                iconStyle={{ marginHorizontal: 10 }}
                                onPress={() => deleteOffer(route.params.token, item._id)}
                            />
                        </View>
                    </Card>
                ))}

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({

})

export default OfferScreen