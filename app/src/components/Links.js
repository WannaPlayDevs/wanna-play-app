import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Links extends Component {

  render() {
    const {item} = this.props
    return (
      <View style={{paddingTop: 20}}>
        <Text>{item.pkMensaje} </Text>
        <Text>{item.cuerpo} </Text>
        <Text>{item.asunto} </Text>
      </View>
    );
  }
}

export default Links;
