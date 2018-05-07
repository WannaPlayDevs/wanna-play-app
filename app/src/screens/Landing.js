import React, { Component } from 'react'
import {
  StyleSheet, 
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Linking
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import {LinearGradient} from 'expo'

export default ({ navigation }) => (
  <LinearGradient
    colors={['#2575fc', '#6a11cb']} 
    locations={[0.25, 1]} 
    style={styles.container}
  >
  <View style={styles.logoContainer}>
    <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
    />
  </View>
  <View style={styles.bodyContainer}>
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LogIn")}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('http://www.google.es')}>
        <Text style={styles.buttonText}>ABOUT</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>WANNA PLAY?</Text>
    </View>
  </View>
  </LinearGradient>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
      width: 200,
      height: 200,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerContainer: {
    flex:1,
    justifyContent: 'center',
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button:{
    borderRadius:50, 
    width: '100%', 
    padding: 10, 
    backgroundColor: 'white',

  },
  buttonText:{
    textAlign: 'center',
    fontSize: 20,
    color: '#2575fc',
    fontWeight: 'bold',
  },
  buttonsContainer:{
    width: '75%',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'space-around'
    //1B9CFC
  }
})