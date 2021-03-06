import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Input, Button, Text, Image, Icon, SocialIcon } from 'react-native-elements';
// import refereeLogo from './images/referee-logo-transparent-bg.png'

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.home}>
        <Image
          source={require('./images/referee-logo-transparent-bg.png')}
          style={{ width: 200, height: 200 }}
        />
      </View>
      {/* <View style={styles.mainContainer}>
        <Text style={styles.header}>Login</Text>

        <View style={styles.formContainer}>
          <Input
            placeholder='Email Address'
            style={styles.formInput}
          />
          <Input
            placeholder='Password'
            style={styles.formInput}
            secureTextEntry={true}
          />
          <Text style={styles.forgot}>Forgot Password?</Text>
          <Button
            title='Sign In'
            buttonStyle={styles.buttonStyle}
          />
          <Button
            title='Login With Google'
            buttonStyle={styles.buttonStyleGoogle}
          />
          <Button
            title='Login With Facebook'
            buttonStyle={styles.buttonStyleFacebook}
          />
        </View>
      </View> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#2EC4B6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    alignItems: 'center'
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 50,
  },
  formContainer: {
    width: 350,
    marginTop: 40,
    alignItems: 'center'
  },
  forgot: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2EC4B6',
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: '#2EC4B6',
    width: 350
  },
  buttonStyleGoogle: {
    marginTop: 10,
    backgroundColor: '#DB4437',
    width: 350
  },
  buttonStyleFacebook: {
    marginTop: 10,
    backgroundColor: '#4267B2',
    width: 350
  },
  signInButton: {
    width: 200,
    height: 30,
    borderRadius: 30
  },
  signInText: {
    color: '#fff',
    fontWeight: "bold",
    textAlign: 'center',
    paddingTop: 5,
  }
});
