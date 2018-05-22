import React, { Component } from 'react';
import { View, Text,  } from 'react-native';
import { graphql } from 'react-apollo';

import ME_QUERY from '../graphql/queries/me'

class Perfil extends Component {
  render() {
    const { data } = this.props
    console.log(data)
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default graphql(ME_QUERY)(Perfil);
