import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onLogIn } from "../../auth";

export default class Signup extends Component {

  state ={
    username: '',
    password: '',
    email: '',
  }

  _onChangeText = (text, type) => this.setState({ [type]: text })

  render (){
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
          onPress={() => {
            onLogIn().then(() => this.props.navigation.navigate("LoggedIn"));
          }}
        />
      </Card>
    </View>
    )
  }
}
