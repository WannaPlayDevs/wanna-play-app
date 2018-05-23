import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import Modal from "react-native-modal";

import { onLogIn } from "../../auth";

import Login from '../screens/LogIn'

import { graphql } from 'react-apollo'
import CREATE_USER from './../graphql/mutations/signup'
import { isMutationErrorAction } from "apollo-client/actions";

class Signup extends Component {

  state ={
    username: '',
    password: '',
    email: '',
    registered: false,
    modal: true,
    errors: [],
  }

  _onChangeText = (text, type) => this.setState({ [type]: text })

  _toggleModal = () => this.setState({ modal: false });

  _onSignupPress = async () => {
    const { username, password, email } = this.state

    const { data, errors } = await this.props.mutate({
      variables: {
        username,
        email,
        password,
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
    try {
      this.setState({ registered: true })
    } catch (error) {
      throw error
    }
  }

  renderErrors () {
    const { errors } = this.state
    console.log('errors')      
      if (errors[0] === 'UNIQUE constraint failed: auth_user.username'){
        return 'El usuario ya existe'
      }
    }

  render (){
    if (this.state.registered){
      return (
        <View>
        <Modal backdropOpacity={0.9} isVisible={this.state.modal}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Usuario registrado con éxito{"\n"}Logueate para iniciar sesion</Text>
            <TouchableOpacity style={styles.modalButton} onPress={this._toggleModal}>
              <Text style={styles.buttonText}>Ir al Login</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {this.state.modal ? null : this.props.navigation.navigate("Landing")}
        </View>
      )
    }
    console.log(this.state.errors)
    return (
      <View style={{ paddingVertical: 20 }}>
      <Card>
        <FormLabel>User Name</FormLabel>
        <FormInput 
          placeholder="User name..." 
          onChangeText={text => this._onChangeText(text, 'username')}
        />
        <FormLabel>Password</FormLabel>
        <FormInput 
          secureTextEntry 
          placeholder="Password..." 
          onChangeText={text => this._onChangeText(text, 'password')}
        />
        <FormLabel>Email</FormLabel>
        <FormInput 
          secureTextEntry 
          placeholder="Email..." 
          onChangeText={text => this._onChangeText(text, 'email')}
        />

        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SIGN UP"
          onPress={this._onSignupPress}
        />
        <FormValidationMessage>{this.state.errors.length > 0 ? this.renderErrors() : null}</FormValidationMessage>
      </Card>
    </View>
    )
  }
}
export default graphql(CREATE_USER)(Signup)


const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2575fc',
    padding: 20,
    borderRadius: 20,
  },
  modalButton: {
    borderRadius:50, 
    width: '100%', 
    padding: 10, 
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 20,
  }, 
  buttonText:{
    textAlign: 'center',
    fontSize: 20,
    color: '#2575fc',
    fontWeight: 'bold',
  },
})

