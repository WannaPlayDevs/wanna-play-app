import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { withApollo, graphql } from 'react-apollo'
import { CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements'

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
      errors: [],
      age: this.props.navigation.getParam('data').age,
      language: this.props.navigation.getParam('data').language,
      description: this.props.navigation.getParam('data').description,
      country: this.props.navigation.getParam('data').country
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
      horarioNoche,
      age,
      language,
      description,
      country,
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
        age: age.toString(),
        language,
        description,
        country,
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
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View style={{padding: 10, justifyContent: 'space-between', width: '100%'}}>
            <Text style={{fontWeight: 'bold',}}>Alias</Text>
            <TextInput
              style={{borderColor: 'gray', borderWidth: 1, marginVertical: 5, padding: 10, borderRadius: 10}}
              onChangeText={(text) => this.setState({alias: text})}
              value={this.state.alias}
              maxLength={15}
              underlineColorAndroid='transparent'
            />
            <Text style={{fontWeight: 'bold',}}>Age</Text>
            <TextInput
              style={{borderColor: 'gray', borderWidth: 1, marginVertical: 5, padding: 10, borderRadius: 10}}
              onChangeText={(text) => this.setState({age: text})}
              value={this.state.age ? this.state.age.toString() : null}
              maxLength={2}
              underlineColorAndroid='transparent'
            />
            <Text style={{fontWeight: 'bold',}}>Location</Text>
            <TextInput
              style={{borderColor: 'gray', borderWidth: 1, marginVertical: 5, padding: 10, borderRadius: 10}}
              onChangeText={(text) => this.setState({country: text})}
              value={this.state.country}
              maxLength={30}
              underlineColorAndroid='transparent'
            />
            <Text style={{fontWeight: 'bold',}}>Language</Text>
            <TextInput
              style={{borderColor: 'gray', borderWidth: 1, marginVertical: 5, padding: 10, borderRadius: 10}}
              onChangeText={(text) => this.setState({language: text})}
              value={this.state.language}
              maxLength={30}
              underlineColorAndroid='transparent'
            />
            <Text style={{fontWeight: 'bold',}}>Bio</Text>
            <TextInput
              style={{borderColor: 'gray', borderWidth: 1, marginVertical: 5, padding: 10, borderRadius: 10}}
              onChangeText={(text) => this.setState({description: text})}
              value={this.state.description}
              maxLength={120}
              underlineColorAndroid='transparent'
            />
          </View>
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
          <Text style={{ color: 'black', marginTop: 5 }}>Availability</Text>
          <View style={{flexDirection: 'row', justifyContent:'center', flexWrap: 'wrap'}}>
            <CheckBox
              title='Morning'
              containerStyle={{backgroundColor: 'transparent'}}
              checked={this.state.horarioManana}
              checkedColor='#3377F4'
              onPress={() => this.setState({horarioManana: !this.state.horarioManana})}
            />
            <CheckBox
              title='Afternoon'
              containerStyle={{backgroundColor: 'transparent'}}
              checked={this.state.horarioTarde}
              checkedColor='#3377F4'
              onPress={() => this.setState({horarioTarde: !this.state.horarioTarde})}
            />
            <CheckBox
              title='Evening'
              containerStyle={{backgroundColor: 'transparent'}}
              checked={this.state.horarioNoche}
              checkedColor='#3377F4'
              onPress={() => this.setState({horarioNoche: !this.state.horarioNoche})}
            />
          </View>
          {this.state.errors.length > 0 ? <Text style={{ color: 'red' }}>Age must be a numeric field</Text> : null}
          <TouchableOpacity style={styles.button} onPress={this._onUpdate}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  button:{
    width: '70%', 
    padding: 10, 
    backgroundColor: '#3377F4',
    marginVertical: 10,
    borderRadius:4
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default graphql(UPDATE_USER)(PerfilEdit)