import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, Image, StatusBar, AsyncStorage, Button, TouchableOpacity, TextInput } from 'react-native'
import { graphql, compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { FontAwesome } from 'react-native-vector-icons'
import Modal from "react-native-modal";
import { Card } from 'react-native-elements'

import RESPONSE_MESSAGE from './../graphql/mutations/responseMessage'

class PerfilDetalle extends Component {

  state = {
    modal: false,
    asunto: '',
    cuerpo: ''
  }

  static navigationOptions = ({ navigation }) => {
    const username = navigation.getParam('data', 'Error')
    return {
      title: username.alias,
    }
  }

  _toggleModal = () => this.setState({ modal: !this.state.modal });
  _onChangeText = (text, type) => this.setState({ [type]: text })

  _responseMessage = async () => {
    const { asunto, cuerpo } = this.state
    const me = this.props.navigation.getParam('data', '!ops!')

    const { data, errors } = await this.props.mutate({
      variables: {
        fkDestinatario: me.pkUser,
        fkRemitente: this.props.info.pkUser,
        asunto,
        cuerpo
      }
    })
    try {
      this._toggleModal()
    } catch (error) {
      throw error
    }
  }

  renderGames(){
    const me = this.props.navigation.getParam('data', '!ops!')
    if(
      !(me && me.playFortnite) && 
      !(me && me.playGta) &&
      !(me && me.playOverwatch) &&
      !(me && me.playRust) &&
      !(me && me.playWow) &&
      !(me && me.playPubg)
    ){
      return <Text>The user has not selected any games yet</Text>
    }
    return(
      <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 20}}>
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
    const me = this.props.navigation.getParam('data', '!ops!')
    return(
    <View>
      {me && me.horarioManana ? <Text style={styles.textAvailability}>Mornings</Text> : null}
      {me && me.horarioNoche ? <Text style={styles.textAvailability}>Evenings</Text> : null}
      {me && me.horarioTarde ? <Text style={styles.textAvailability}>Afternoons</Text> : null}
    </View>
    )
  }

  render() {
    const me = this.props.navigation.getParam('data', '!ops!')
    const { navigate } = this.props.navigation
    if(this.state.modal){
      return(
        <View>
          <Modal backdropOpacity={1} backdropColor={'black'} isVisible={this.state.modal}>
            <Card style={{flex: 1, width: '100%', alignItems: 'center'}}>
              <TextInput 
                style={{borderColor: 'gray', borderRadius: 10, borderWidth: 1, marginBottom: 5, padding: 10}}
                placeholder='Subject'
                underlineColorAndroid='transparent'
                maxLength={30}
                onChangeText={text => this._onChangeText(text, 'asunto')}  
              />
              <TextInput 
                placeholder='Type your message here'
                onChangeText={text => this._onChangeText(text, 'cuerpo')}
                multiline={true}
                maxLength={120}
                underlineColorAndroid='transparent'
                style={{borderColor: 'gray', borderRadius: 10, borderWidth: 1, padding: 10}}
              />
              <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.button} onPress={this._responseMessage}>
                  <Text style={styles.buttonText}>SEND</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this._toggleModal}>
                  <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </Modal>
        </View>
      )
    }

    return (
      <ScrollView>
        <StatusBar hidden={true} />
        <View style={{ alignItems: 'center' }}>
          <View style={styles.userAvatarContainer}>
            <View style={styles.userAvatar}>
              <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>{me ? me.alias.charAt(0).toUpperCase() : null}</Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{me ? me.alias : null}</Text>
            <Text>@{me ? me.username : null}</Text>
            <TouchableOpacity style={styles.edit} onPress={this._toggleModal}>
              <FontAwesome name="envelope" color={'#03A9F4'} size={30}/>
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.section}>
              <Text>Availability</Text>
              {this.renderAvailability()}
            </View>
            <View style={styles.section}>
              <Text>Age</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>{ me ? me.age : null }</Text>
            </View>
            <View style={styles.section}>
              <Text>Language</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>{me ? me.language : null}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 10, alignItems: 'center', width: '90%' }}>
            <Text>Description</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>{me ? me.description : null}</Text>
          </View>
            {this.renderGames()}
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
  userAvatar: {
    backgroundColor: "#bcbec1",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  selectedGames: {
    width: 100,
    height: 139,
    borderRadius: 10,
    marginHorizontal: 10,
    resizeMode: 'stretch',
    margin: 5,
    opacity: 1
  },
  unselectedGames: {
    width: 100,
    height: 139,
    borderRadius: 10,
    marginHorizontal: 10,
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
  },
  edit: {
    position: 'absolute',
    top: 35,
    right: -45,
    zIndex: 2
  }
})

export default (compose(
  connect(state => ({info: state.user.info})),
  graphql(RESPONSE_MESSAGE))
)(PerfilDetalle)
