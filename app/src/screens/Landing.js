import React, { Component } from 'react'
import {
  StyleSheet, 
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import {LinearGradient} from 'expo'
import Modal from 'react-native-modal'
import { FontAwesome } from 'react-native-vector-icons'
 
export default class Landing extends Component {

  state = {
    modal: false
  }
  render(){
    if(this.state.modal){
      return(
          
        <LinearGradient
          colors={['#2575fc', '#6a11cb']} 
          locations={[0.25, 1]} 
          style={styles.container}
        >
          <Modal backdropOpacity={0.1} backdropColor={'black'} isVisible={this.state.modal}>
            <View style={styles.logoContainer}>
              <Image
                  style={styles.logo}
                  source={require('../../assets/images/logo.png')}
              />
            </View>
            <View style={styles.logoContainer}>
              <Text style={styles.footerText}>WannaPlay Devs Inc</Text>
              
              <View style={{marginVertical: 15}}>
              <Text style={styles.developer}>Ivan Barbero / @ibarla</Text>
              <Text style={styles.developer}>Jose Miguel Paredes  / @jmpr5</Text>
              <Text style={styles.developer}>Kike Guilabert  / @HenryTux</Text>
              <Text style={styles.developer}>Sergio Martinez  / @titoserch</Text>
              </View>
              <Text style={styles.dev}><FontAwesome name="github" color="white" size={30} />  Follow us:</Text>
              <Text style={styles.developer}>https://github.com/WannaPlayDevs</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ modal: false })}
              color="blue"
              style={styles.edit}
            >
              <FontAwesome name="times-circle" size={25} color={'white'}/>
            </TouchableOpacity>
          </Modal>
          
        </LinearGradient>
      )
    }
    return(
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
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("SignUp")}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("LogIn")}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.setState({modal: true})}>
              <Text style={styles.buttonText}>ABOUT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>WANNA PLAY?</Text>
          </View>
        </View>
      </LinearGradient>
    )
  }
}

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
  },
  dev: {
    fontSize: 18, 
    color: 'white'
  },
  developer: {
    color: 'white',
    marginLeft: 10,
  },
  edit: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2
  }
})