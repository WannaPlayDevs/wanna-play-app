import React, { Component } from "react";
import { View, AsyncStorage, Text } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { onLogIn } from "../../auth";

import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import { login } from '../actions/user'

import LOGIN_MUTATION from '../graphql/mutations/login'

class Login extends Component {

  state ={
    username: '',
    password: '',
    errors: [],
  }

  _onChangeText = (text, type) => this.setState({ [type]: text })

  _onLoginPress = async () => {
    const { username, password } = this.state

    const { data, errors } = await this.props.mutate({
      variables: {
        username,
        password,
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });

    console.log(errors)
    try {
      
      await AsyncStorage.setItem('@token', data.tokenAuth.token)
      
      this.props.navigation.navigate("LoggedIn")
      
    } catch (error) {
      console.log('this.props.data.error')
      throw error
    }
    
  }

  render(){
    console.log(this.state.errors)
    return(
      
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>User</FormLabel>
          <FormInput 
            placeholder="User name..." 
            onChangeText={text => this._onChangeText(text, 'username')}
          />
          <FormLabel>Password</FormLabel>
          <FormInput 
            secureTextEntry 
            placeholder="Password..."
            shake={this.state.errors} 
            onChangeText={text => this._onChangeText(text, 'password')}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="LOG IN"
            onPress={this._onLoginPress}
          />
          <FormValidationMessage>{this.state.errors ? this.state.errors : null}</FormValidationMessage>
        </Card>
      </View>
    )
  }
}

export default compose(
  graphql(LOGIN_MUTATION),
  connect(undefined, { login }),
)(Login);