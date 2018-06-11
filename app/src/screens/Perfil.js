import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, Image, StatusBar, AsyncStorage, TouchableOpacity } from 'react-native'
import { graphql, compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { FontAwesome } from 'react-native-vector-icons'
import { Button } from 'react-native-elements'
 
import { getUserInfo } from '../actions/user'
import { logout } from '../actions/user';

import ME_QUERY from '../graphql/queries/me'

class Perfil extends Component {

  _logout = () => {
    this.props.client.resetStore()
    return this.props.logout();
  }

  componentDidMount() {
    this._getRefesh();
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    this.props.getUserInfo(me);
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  _getRefesh = async () => {
    this.props.data.startPolling(100)
    await this._sleep(1000);
    this.props.data.stopPolling()
  }

  renderGames(){
    const { me } = this.props.data
    if(
      !(me && me.playFortnite) && 
      !(me && me.playGta) &&
      !(me && me.playOverwatch) &&
      !(me && me.playRust) &&
      !(me && me.playWow) &&
      !(me && me.playPubg)
    ){
      return (
        <View style={{width: '90%', alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>Provide us more information about yourself by pressing the blue pen icon</Text>
        </View>
      )
    }
    return(
      <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        <Image
          style={me && me.playWow ? styles.selectedGames : styles.unselectedGames}
          source={require('../../assets/images/wow.png')}
        />
        <Image
          style={me && me.playFortnite ? styles.selectedGames : styles.unselectedGames}
          source={require('../../assets/images/fortnite.png')}
        />
        <Image
          style={me && me.playGta ? styles.selectedGames : styles.unselectedGames}
          source={require('../../assets/images/gta.png')}
        />
        <Image
          style={me && me.playOverwatch ? styles.selectedGames : styles.unselectedGames}
          source={require('../../assets/images/over.png')}
        />
        <Image
          style={me && me.playRust ? styles.selectedGames : styles.unselectedGames}
          source={require('../../assets/images/rust.png')}
        />
        <Image
          style={me && me.playPubg ? styles.selectedGames : styles.unselectedGames}
          source={require('../../assets/images/pubg.png')}
        />
      </View>
    )
  }

  renderAvailability(){
    const { me } = this.props.data
    return(
    <View style={{alignItems: 'center'}}>
      {me && me.horarioManana ? <Text style={styles.textAvailability}>Mornings</Text> : null}
      {me && me.horarioNoche ? <Text style={styles.textAvailability}>Evenings</Text> : null}
      {me && me.horarioTarde ? <Text style={styles.textAvailability}>Afternoons</Text> : null}
    </View>
    )
  }

  render() {
    const { me } = this.props.data
    const { navigate } = this.props.navigation
    this._getUserInfo();
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{backgroundColor: '#2575fc'}}>
        <StatusBar hidden={true} />
        <View style={{alignItems: 'center'}}>
          <View style={styles.userAvatarContainer}>
            <View style={styles.userAvatar}>
              <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'black' }}>{me ? me.alias.charAt(0).toUpperCase() : null}</Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>{me ? me.alias : null}</Text>
            <Text style={{color: 'black' }}>@{me ? me.username : null}</Text>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.section}>
              <Text style={{color: 'black' }}>Availability</Text>
              {this.renderAvailability()}
            </View>
            <View style={styles.section}>
              <Text style={{color: 'white' }}>Age</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5, color: 'white' }}>{me ? me.age : null}</Text>
            </View>
            <View style={styles.section}>
              <Text style={{color: 'white' }}>Language</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5, color: 'white' }}>{me ? me.language : null}</Text>
            </View>
          </View>
            {this.renderGames()}
          <TouchableOpacity style={styles.button} onPress={this._logout}>
            <Text style={styles.buttonText}>LOG OUT</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Edit", { data: me })
              }}
              style={styles.edit}
          >
            <FontAwesome name="pencil" size={25} color={'#3377F4'}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  userAvatarContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
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
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  textAvailability: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    color: 'black',
  },
  userAvatar: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10
  },
  button:{
    width: '70%', 
    padding: 10, 
    backgroundColor: 'red',
    marginVertical: 10,
    borderRadius:4
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  edit: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 2
  }
})

export default withApollo(compose(
  connect(undefined, { logout }),
  connect(undefined, { getUserInfo }),
  graphql(ME_QUERY)
)(Perfil))
