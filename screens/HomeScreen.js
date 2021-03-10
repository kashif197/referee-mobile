import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, Image, Avatar, Icon } from 'react-native-elements';


function HomeScreen({ navigation, route }) {
    console.log(route.params.result.user.photoUrl)
    return (
        <View>
            <View style={styles.statsBox}>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Icon
                        name="menu-outline"
                        type='ionicon'
                        color='#fff'
                        size={30}
                    />
                    <Image
                        source={require('../images/referee-logo-transparent-bg.png')}
                        style={{ width: 150, height: 150 }}
                    />
                    <Avatar
                        rounded
                        source={{ uri: route.params.result.user.photoUrl }}
                        size="medium"
                    />
                </View>
                <Text style={styles.header}>Hello</Text>
                <Text style={styles.subheader}>Zombie Burger</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statsBox: {
        backgroundColor: '#2EC4B6',
        height: 400,
        borderBottomLeftRadius: 500,
    },
    header: {
        fontSize: 30,
        marginLeft: 15,
        marginTop: 170,
        fontWeight: 'bold'
    },
    subheader: {
        fontSize: 30,
        marginLeft: 15,
        fontWeight: 'bold'
    },
})

export default HomeScreen