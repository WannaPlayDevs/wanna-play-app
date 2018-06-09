import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, Image, StatusBar, AsyncStorage, Button, TouchableOpacity, TextInput } from 'react-native'
import { graphql, compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { FontAwesome } from 'react-native-vector-icons'
import Modal from "react-native-modal";

import RESPONSE_MESSAGE from './../graphql/mutations/responseMessage'

class PerfilDetalle extends Component {

  state = {
    modal: false,
    asunto: '',
    cuerpo: ''
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
    console.log('perfil detalle ', this.props)

    if(this.state.modal){
      return(
        <View>
          <Modal backdropOpacity={1} backdropColor={'white'} isVisible={this.state.modal} s>
            <View style={{height: '100%', width: '100%', alignItems: 'center',}}>
              <TextInput 
                placeholder='Asunto'
                onChangeText={text => this._onChangeText(text, 'asunto')}  
              />
              <TextInput 
                placeholder='Cuerpo'
                onChangeText={text => this._onChangeText(text, 'cuerpo')}
                multiline={true}
                numberOfLines={10}
              />
              <TouchableOpacity onPress={this._toggleModal}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._responseMessage}>
                <Text>Responder</Text>
              </TouchableOpacity>
            </View>
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
            <TouchableOpacity style={styles.section} onPress={this._toggleModal}>
              <FontAwesome name="envelope" color={'#03A9F4'} size={30}/>
            </TouchableOpacity>
            <View style={styles.section}>
              <Text>Language</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Polski</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>English</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Spanish</Text>
            </View>
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

export default (compose(
  connect(state => ({info: state.user.info})),
  graphql(RESPONSE_MESSAGE))
)(PerfilDetalle)
