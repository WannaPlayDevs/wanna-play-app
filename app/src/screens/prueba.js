import React, { Component } from 'react';
import { View, Text, AsyncStorage  } from 'react-native';

class prueba extends Component {
    state={pkid:''}
    getAsync = async () => {
        try {
            const value = await AsyncStorage.getItem('@id');
            if (value !== null){
            this.setState({pkid: value})
            console.log(value)
            }
        } catch (error) {
            console.log('nada por aqui')
        }
        }

  render() {
      {this.getAsync()}
    return (
      <View>
        <Text> Yeeeeeh" </Text>
        <Text> {this.state.pkid} </Text>
      </View>
    );
  }
}

export default prueba;
