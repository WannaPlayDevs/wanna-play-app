import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, Image, StatusBar, AsyncStorage, Button, TouchableOpacity } from 'react-native'
import { graphql, compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { FontAwesome } from 'react-native-vector-icons'

import { getUserInfo } from '../actions/user'
import { logout } from '../actions/user';

import ME_QUERY from '../graphql/queries/me'
import Games from '../components/Games'

class Perfil extends Component {

  _logout = () => {
    console.log('onlogout', this.props)
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
      return <Text>No hay juegos que mostrar</Text>
    }
    return(
      <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
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
    this._getUserInfo();
    return (
      <ScrollView>
        <StatusBar hidden={true} />
        <View style={{ alignItems: 'center' }}>
          <View style={styles.userAvatarContainer}>
            <View style={styles.userAvatar}>
              <Text style={{ fontSize: 28 }}>{me ? me.alias.charAt(0).toUpperCase() : null}</Text>
            </View>
            <TouchableOpacity
            onPress={() => {
              console.log(this.state)
              this.props.navigation.navigate("Edit", { data: me })
            }}
            title="Edit Profile"
            color="blue"
          >
            <FontAwesome name="pencil" size={25} color={'#03A9F4'}/>
          </TouchableOpacity>
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
            {this.renderGames()}
          <Button
            backgroundColor="#03A9F4"
            title="LOG OUT"
            onPress={this._logout}
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
    marginTop: 5
  }

})

export default withApollo(compose(
  connect(undefined, { logout }),
  connect(undefined, { getUserInfo }),
  graphql(ME_QUERY)
)(Perfil))
