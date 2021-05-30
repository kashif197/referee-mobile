import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, Avatar, ListItem, Icon, ButtonGroup } from 'react-native-elements';


function AddOffer({ route, navigation }) {
    const [type, setType] = React.useState(0)
    const [campaignName, setCampaignName] = React.useState('')
    const [headline, setHeadline] = React.useState('')
    const [commValue, setCommValue] = React.useState(0)
    const [target, setTarget] = React.useState()
    const [description, setDescription] = React.useState('')

    function addAttempt(token, id, campaign_name, headline, commission_based, commission_value, target_transaction, description) {
        // if (type === 0) {
        //     fetch("http://192.168.10.15:5000/offer/addOffer", {
        //         method: "POST",
        //         headers: {
        //             "Authorization": "Bearer " + token,
        //             "Accept": "application/json",
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             business_id: id,
        //             campaign_name: campaign_name,
        //             headline: headline,
        //             commission_based: true,
        //             commission_value: commission_value,
        //             target_transaction: target_transaction,
        //             description: description
        //         }),
        //     })
        //         .then((res) => res.json())
        //         .then((data) => {
        //             if (data.status) {
        //                 navigation.navigate('Offers', {updatePosts: 'headline'})
        //                 alert('Offer Created')
        //             }
        //             else {
        //                 alert(data.message)
        //             }
        //         })
        //         .catch((err) => console.log(err));
        // }
        // else {
            fetch("http://192.168.10.15:5000/offer/addOffer", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    business_id: id,
                    campaign_name: campaign_name,
                    headline: headline,
                    commission_based: false,
                    target_transaction: target_transaction,
                    description: description
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        navigation.navigate('Offers', {updatePosts: 'headline'})
                        alert('Offer Created')
                    }
                    else {
                        alert(data.message)
                    }
                })
                .catch((err) => console.log(err));
        // }


    }

    const buttons = ['Commission', 'Non-Commission']

    return (
        <View style={{ marginTop: 80, width: 350, alignSelf: 'center' }}>
            <View>
                {/* <ButtonGroup
                    onPress={setType}
                    selectedIndex={type}
                    buttons={buttons}
                    containerStyle={{ height: 50, marginBottom:30 }}
                    buttonContainerStyle={{ height: 50 }}
                    selectedButtonStyle={{backgroundColor: '#2EC4B6'}}
                    textStyle={{fontSize: 16, fontWeight: 'bold'}}
                /> */}
                <Input
                    label="Campaign Name"
                    onChangeText={value => setCampaignName(value)}
                />
                <Input
                    label="Headline"
                    onChangeText={value => setHeadline(value)}
                />
                <Input
                    label="Target Transactions"
                    onChangeText={value => setTarget(value)}
                />
                {/* <Input
                    label="Commission Value"
                    onChangeText={value => setCommValue(value)}
                    disabled={(type === 0) ? false : true}
                /> */}
                <Input
                    label="Description"
                    onChangeText={value => setDescription(value)}
                />
                <Button
                    title='Save'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {addAttempt(route.params.token, route.params.id, campaignName, headline, type, commValue, target, description)}
                    }
                />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#2EC4B6',
        width: 320,
        alignSelf: 'center'
    },
})

export default AddOffer