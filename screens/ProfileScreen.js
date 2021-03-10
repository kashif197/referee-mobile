import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Input, Button, Text, Avatar, ListItem, Icon } from 'react-native-elements';

function ProfileScreen({ route, navigation }) {
    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={require('../images/referee-web-bg.png')} style={{ width: 415 }}>
                <View style={styles.headerArea}>
                    <Avatar
                        rounded
                        source={{ uri: 'https://lh3.googleusercontent.com/a-/AOh14GgLQAod-ufw4w9xEig-YCQT-SFJahNGzuprDhIusg=s96-c' }}
                        size="xlarge"
                    />
                    {/* <View style={styles.headerBorder}><Text style={styles.headerText}>{route.params.title}</Text></View> */}
                </View>
            </ImageBackground>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Business Title</ListItem.Title>
                </ListItem.Content>
                <Text style={{ fontSize: 16, color: '#707070' }}>{route.params.title}</Text>
                <Icon
                    name="chevron-forward-outline"
                    type='ionicon'
                    color='#707070'
                />
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Email Address</ListItem.Title>
                </ListItem.Content>
                <Text style={{ fontSize: 16, color: '#707070' }}>{route.params.email}</Text>
                <Icon
                    name="chevron-forward-outline"
                    type='ionicon'
                    color='#707070'
                />
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Username</ListItem.Title>
                </ListItem.Content>
                <Text style={{ fontSize: 16, color: '#707070' }}>{route.params.username}</Text>
                <Icon
                    name="chevron-forward-outline"
                    type='ionicon'
                    color='#707070'
                />
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Contact Number</ListItem.Title>
                </ListItem.Content>
                <Text style={{ fontSize: 16, color: '#707070' }}>{route.params.contact}</Text>
                <Icon
                    name="chevron-forward-outline"
                    type='ionicon'
                    color='#707070'
                />
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Designation</ListItem.Title>
                </ListItem.Content>
                <Text style={{ fontSize: 16, color: '#707070' }}>{route.params.designation}</Text>
                <Icon
                    name="chevron-forward-outline"
                    type='ionicon'
                    color='#707070'
                />
            </ListItem>
            <ListItem bottomDivider containerStyle={{ marginTop: 20 }} onPress={() => {console.log(route.params.id) ; navigation.navigate('Offers', { id: route.params.id, token: route.params.token })}}>
                <ListItem.Content>
                    <ListItem.Title>My Offers</ListItem.Title>
                </ListItem.Content>
                <Icon
                    name="chevron-forward-outline"
                    type='ionicon'
                    color='#707070'
                />
            </ListItem>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
    },
    image: {
        flex: 1,
        height: 200,
        width: 200,
        resizeMode: "cover",
        justifyContent: "center"
    },
    headerArea: {
        height: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    }
})

export default ProfileScreen