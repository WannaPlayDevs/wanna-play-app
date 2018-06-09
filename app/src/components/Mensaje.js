import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput  } from 'react-native';
import Modal from "react-native-modal";

import { graphql } from 'react-apollo'
import RESPONSE_MESSAGE from './../graphql/mutations/responseMessage'


class Mensaje extends Component {

  state = {
    modal: false,
    asunto: '',
    cuerpo: ''
  }

  _toggleModal = () => this.setState({ modal: !this.state.modal });
  _onChangeText = (text, type) => this.setState({ [type]: text })

  _responseMessage = async () => {
    const { asunto, cuerpo } = this.state

    const { data, errors } = await this.props.mutate({
      variables: {
        fkDestinatario: this.props.item.fkRemitente.pkUser,
        fkRemitente: this.props.item.fkDestinatario.pkUser,
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

  render() {
    const {item} = this.props
    console.log('item', item)

    if(this.state.modal){
      return(
        <View>
        <Modal backdropOpacity={1} backdropColor={'white'} isVisible={this.state.modal} s>
          <View style={{height: '100%', width: '100%', alignItems: 'center',}}>
          <View
          style={{
            backgroundColor: "#bcbec1",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: 30,
            alignSelf: "center",
            marginBottom: 20
          }}
        >
          <Text style={{ color: "white", fontSize: 28 }}>{item.fkRemitente.alias.charAt(0).toUpperCase()}</Text>
        </View>
        <Text>{item.fkRemitente.alias}</Text>
        <Text>{item.asunto}</Text>
        <Text>{item.cuerpo}</Text>

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
      <TouchableOpacity onPress={this._toggleModal}>
        <View style={styles.container}>
        <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 50,
          height: 50,
          borderRadius: 25,
          alignSelf: "center",
          marginRight: 10
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>{item.fkRemitente.alias.charAt(0).toUpperCase()}</Text>
      </View>
          <View style={styles.datos}>
            <Text style={styles.textName}>{item.fkRemitente.alias}</Text>
            <Text style={styles.asunto}>{item.asunto}</Text>
            <Text style={styles.body}>{item.cuerpo}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    marginBottom: 3,
  },
  datos: {
    justifyContent: 'space-between'
  },
  textName: {
    fontSize: 22,
  }, 
  body: {
    fontSize: 11,
    color: 'grey'
  },
  asunto: {
    fontSize: 14
  }
})

export default graphql(RESPONSE_MESSAGE)(Mensaje)
