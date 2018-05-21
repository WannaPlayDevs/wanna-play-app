import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
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
  }

  _onChangeText = (text, type) => this.setState({ [type]: text })

  _onSignupPress = async () => {
    const { username, password, email } = this.state

    const { data } = await this.props.mutate({
      variables: {
        username,
        email,
        password,
      }
    })
    try {
      this.setState({ registered: true })
    } catch (error) {
      throw error
      console.log('error redirect')
    }
    
    console.log(this.state)
  }

  render (){
    if(this.state.registered){
      console.log('registradoooo!')
      return (
        <Text style={{fontSize: 60}}>Logueate para iniciar sesion</Text>
      )
    }
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
      </Card>
    </View>
    )
  }
}
export default graphql(CREATE_USER)(Signup)
