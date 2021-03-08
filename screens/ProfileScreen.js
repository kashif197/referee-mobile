import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, Image } from 'react-native-elements';


function ProfileScreen({ navigation }) {
    return (
        <View>
            <View style={styles.statsBox}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={require('../images/referee-logo-transparent-bg.png')}
                        style={{ width: 150, height: 150 }}
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

export default ProfileScreen