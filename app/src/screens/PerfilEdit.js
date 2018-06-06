import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { withApollo } from 'react-apollo'

class PerfilEdit extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      alias: '' 
    }
  }

  render() {
    const data = this.props.navigation.getParam('objeto', 'Oh oh, no hay alias...')
    return (
      <View>
        <TextInput
          onChangeText={(text) => this.setState({alias: text})}
          value={this.state.alias}
        />
        <Text>Prop desde perfil - alias: {data.alias}</Text>
        <Text>Prop desde perfil - pkuser : {data.pkUser}</Text>
        <Text>Prop desde perfil - username : {data.username}</Text>
        <Button
          onPress={() => {
            console.log(this.state)
            this.props.navigation.navigate("Main")
          }}
          title="Save"
          color="blue"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default PerfilEdit