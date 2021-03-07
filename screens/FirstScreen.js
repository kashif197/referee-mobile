import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Image } from 'react-native-elements';

function FirstScreen({ navigation }) {
    return (
        <View style={styles.home}>
            <Image
                source={require('../images/referee-logo-transparent-bg.png')}
                style={{ width: 200, height: 200 }}
            />
            <Button
                title="Get Started"
                buttonStyle={styles.button}
                titleStyle={{ color: '#2EC4B6' }}
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#2EC4B6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#fff',
        width: 300
    }
});

export default FirstScreen