import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, Image, StatusBar, AsyncStorage, Button } from 'react-native'
import { graphql, compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'

import { getUserInfo } from '../actions/user'
import { logout } from '../actions/user';

import ME_QUERY from '../graphql/queries/me'

const gamesList = [
  {
    "id": 1,
    "name": "Counter Strike",
  },
  {
    "id": 2,
    "name": "Overwatch",
  },
  {
    "id": 3,
    "name": "The Sims 3",
  },
  {
    "id": 4,
    "name": "Grand Theft Auto V",
  },
]

class Perfil extends Component {

  _logout = () => {
    console.log('onlogout', this.props)
    this.props.client.resetStore()
    return this.props.logout();
  }

  componentDidMount() {
    this._getUserInfo();
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
      return <Text>No hay juegos que mostrar</Text>
    }
    return(
      <View>
        {me && me.playFortnite ?<Text>Fortnite</Text>: null}
        {me && me.playGta ?<Text>GTA V</Text>: null}
        {me && me.playOverwatch ?<Text>Overwatch</Text>: null}
        {me && me.playRust ?<Text>Rust</Text>: null}
        {me && me.playWow ?<Text>Wow</Text>: null}
        {me && me.playPubg ?<Text>Pubg</Text>: null}
      </View>
    )
  }

  renderAvailability(){
    const { me } = this.props.data
    return(
    <View>
      {me && me.horarioManana ? <Text style={styles.textAvailability}>Mornings</Text> : null}
      {me && me.horarioNoche ? <Text style={styles.textAvailability}>Evenings</Text> : null}
      {me && me.horarioTarde ? <Text style={styles.textAvailability}>Afternoons</Text> : null}
    </View>
    )
  }

  render() {
    const { me } = this.props.data
    const { navigate } = this.props.navigation
    return (
      <ScrollView>
        <StatusBar hidden={true} />
        <View style={{ alignItems: 'center' }}>
          <View style={styles.userAvatarContainer}>
            <View style={styles.userAvatar}>
              <Text style={{ fontSize: 28 }}>{me ? me.alias.charAt(0).toUpperCase() : null}</Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{me ? me.alias : null}</Text>
            <Text>@{me ? me.username : null}</Text>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.section}>
              <Text>Availability</Text>
              {this.renderAvailability()}
            </View>
            <View style={styles.section}>
              <Text>Age</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>23</Text>
            </View>
            <View style={styles.section}>
              <Text>Language</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Polski</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>English</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Spanish</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 25 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink', borderRadius: 50, marginHorizontal: 5, width: 30, height: 30 }}>
              <Text style={{ color: 'white' }}>M</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink', borderRadius: 50, marginHorizontal: 5, width: 30, height: 30 }}>
              <Text style={{ color: 'white' }}>T</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
              <Text style={{ textAlign: 'center' }}>W</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
              <Text style={{ textAlign: 'center' }}>T</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink', borderRadius: 50, marginHorizontal: 5, width: 30, height: 30 }}>
              <Text style={{ color: 'white' }}>F</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
              <Text style={{ textAlign: 'center' }}>S</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink', borderRadius: 50, marginHorizontal: 5, width: 30, height: 30 }}>
              <Text style={{ color: 'white' }}>S</Text>
            </View>
          </View>
            {this.renderGames()}
          <Button
            backgroundColor="#03A9F4"
            title="LOG OUT"
            onPress={this._logout}
          />
          <Button
            onPress={() => {
              console.log(this.state)
              this.props.navigation.navigate("Edit", { data: me })
            }}
            title="Edit Profile"
            color="blue"
          />
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
    marginTop: 50,
  },
  userAvatar: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 20,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 5
  }

})

export default withApollo(compose(
  connect(undefined, { logout }),
  connect(undefined, { getUserInfo }),
  graphql(ME_QUERY)
)(Perfil))
