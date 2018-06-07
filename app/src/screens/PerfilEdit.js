import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { withApollo, graphql } from 'react-apollo'

import UPDATE_USER from '../graphql/mutations/editProfile'

class PerfilEdit extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      alias: '',
      errors: []
    }
  }

  _onUpdate = async () => {
    const { alias } = this.state
    const me = this.props.navigation.getParam('data', '!ops!')

    const { data, errors } = await this.props.mutate({
      variables: {
        alias,
        pkUser: me.pkUser,
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
    this.props.navigation.navigate("Main")
  }


  render() {
    const me = this.props.navigation.getParam('data', '!ops!')
    return (
      <View>
        <TextInput
          onChangeText={(text) => this.setState({alias: text})}
          value={this.state.alias}
        />
        <Text>Prop desde perfil - alias: {me.alias}</Text>
        <Text>Prop desde perfil - pkuser : {me.pkUser}</Text>
        <Text>Prop desde perfil - username : {me.username}</Text>
        <Button
          onPress={this._onUpdate}
          title="Save"
          color="blue"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default graphql(UPDATE_USER)(PerfilEdit)