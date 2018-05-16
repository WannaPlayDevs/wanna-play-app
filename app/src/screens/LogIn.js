import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onLogIn } from "../../auth";

export default class Login extends Component {

  state ={
    username: '',
    password: '',
  }

  _onChangeText = (text, type) => this.setState({ [type]: text })

  render(){
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
            onChangeText={text => this._onChangeText(text, 'password')}
            />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="LOG IN"
            onPress={() => {
              onLogIn().then(() => this.props.navigation.navigate("LoggedIn"));
            }}
          />
        </Card>
      </View>
    )
  }
}
