import React, {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, Avatar, ListItem, Icon } from 'react-native-elements';

function EditScreen({ route, navigation }) {

    const [headline, setHeadline] = React.useState(route.params.headline)
    const [description, setDescription] = React.useState(route.params.description)
    const [update, setUpdate] = React.useState('')

    useEffect(
        () => {
            if (update !== '') {
                navigation.navigate('Offers', {updatePosts: 'headline'})
                setUpdate('')
            }
        },
        [update],
    );

    function editAttempt(token, id, headline, description) {
        fetch("http://192.168.10.15:5000/offer/edit/" + id, {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                campaign_name: route.params.name,
                headline: headline,
                description: description
            }),
        })
            .then((res) => {res.json()})
            .then((Json) => {
                setUpdate('Done')
            })
            .catch((err) => console.log(err));
    }



    return (
        <View style={{ marginTop: 100, width: 350, alignSelf: 'center' }}>
            <View>
                <Input
                    label="Headline"
                    defaultValue={route.params.headline}
                    onChangeText={value => setHeadline(value)}
                />
                <Input
                    label="Description"
                    defaultValue={route.params.description}
                    onChangeText={value => setDescription(value)}
                />
                <Button
                    title='Save'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        editAttempt(route.params.token, route.params.id,  headline, description)
                        }}
                />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#2EC4B6',
        width: 320,
        marginLeft: 20,
        marginTop: 20
    },
})

export default EditScreen