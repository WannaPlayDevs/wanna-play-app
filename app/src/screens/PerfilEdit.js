import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import { withApollo, graphql } from 'react-apollo'
import { CheckBox } from 'react-native-elements'

import UPDATE_USER from '../graphql/mutations/editProfile'

class PerfilEdit extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      alias: this.props.navigation.getParam('data').alias,
      playGta: this.props.navigation.getParam('data').playGta,
      playOverwatch: this.props.navigation.getParam('data').playOverwatch,
      playFortnite: this.props.navigation.getParam('data').playFortnite,
      playPubg: this.props.navigation.getParam('data').playPubg,
      playWow: this.props.navigation.getParam('data').playWow,
      playRust: this.props.navigation.getParam('data').playRust,
      horarioManana: this.props.navigation.getParam('data').horarioManana,
      horarioTarde: this.props.navigation.getParam('data').horarioTarde,
      horarioNoche: this.props.navigation.getParam('data').horarioNoche,
      errors: []
    }
  }

  _onUpdate = async () => {
    const { 
      alias,
      playGta,
      playOverwatch,
      playFortnite,
      playPubg,
      playWow,
      playRust,
      horarioManana,
      horarioTarde,
      horarioNoche
    } = this.state
    const me = this.props.navigation.getParam('data', '!ops!')

    const { data, errors } = await this.props.mutate({
      variables: {
        alias,
        playGta,
        playOverwatch,
        playFortnite,
        playPubg,
        playWow,
        playRust,
        horarioManana,
        horarioTarde,
        horarioNoche,
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
        <Text>Alias</Text>
        <TextInput
          onChangeText={(text) => this.setState({alias: text})}
          value={this.state.alias}
        />
        <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => this.setState({playWow: !this.state.playWow})}
          >
            <Image
            style={this.state.playWow ? styles.selectedGames : styles.unselectedGames}
            source={require('../../assets/images/wow.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({playFortnite: !this.state.playFortnite})}
          >
            <Image
              style={this.state.playFortnite ? styles.selectedGames : styles.unselectedGames}
              source={require('../../assets/images/fortnite.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({playGta: !this.state.playGta})}
          >
            <Image
              style={this.state.playGta ? styles.selectedGames : styles.unselectedGames}
              source={require('../../assets/images/gta.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({playOverwatch: !this.state.playOverwatch})}
          >
            <Image
              style={this.state.playOverwatch ? styles.selectedGames : styles.unselectedGames}
              source={require('../../assets/images/over.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({playPubg: !this.state.playPubg})}
          >
            <Image
              style={this.state.playPubg ? styles.selectedGames : styles.unselectedGames}
              source={require('../../assets/images/pubg.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({playRust: !this.state.playRust})}
          >
            <Image
              style={this.state.playRust ? styles.selectedGames : styles.unselectedGames}
              source={require('../../assets/images/rust.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <CheckBox
            title='Mañanas'
            checked={this.state.horarioManana}
            onPress={() => this.setState({horarioManana: !this.state.horarioManana})}
          />
          <CheckBox
            title='Tardes'
            checked={this.state.horarioTarde}
            onPress={() => this.setState({horarioTarde: !this.state.horarioTarde})}
          />
          <CheckBox
            title='Noches'
            checked={this.state.horarioNoche}
            onPress={() => this.setState({horarioNoche: !this.state.horarioNoche})}
          />
        </View>
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
  selectedGames: {
    width: 100,
    height: 139,
    borderRadius: 10,
    marginRight: 20,
    resizeMode: 'stretch',
    margin: 5,
    opacity: 1
  },
  unselectedGames: {
    width: 100,
    height: 139,
    borderRadius: 10,
    marginRight: 20,
    resizeMode: 'stretch',
    margin: 5,
    opacity: 0.3
  },
})

export default graphql(UPDATE_USER)(PerfilEdit)