import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput  } from 'react-native';
import Modal from "react-native-modal";
import { Card, Divider } from 'react-native-elements'

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
    if(this.state.modal){
      return(
        <View>
          <Modal backdropOpacity={1} backdropColor={'black'} isVisible={this.state.modal}>
            <Card style={{flex: 1, width: '100%', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18 }}>Reply to {item.fkRemitente.alias}'s message:</Text>
              <Text style={{fontStyle: 'italic' , fontSize: 14}}>{item.cuerpo}</Text>
              <Divider style={{ backgroundColor: 'grey', marginVertical: 10 }} />
              <TextInput 
                style={{borderColor: 'gray', borderWidth: 1, marginBottom: 5, padding: 10, borderRadius: 10 }}
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
                style={{borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 10 }}
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
      <TouchableOpacity onPress={this._toggleModal}>
        <View style={styles.container}>
          <View style={styles.userAvatar}>
            <Text style={{ color: "white", fontSize: 28 }}>{item.fkRemitente.alias.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.datos}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={styles.textName}>{item.fkRemitente.alias}</Text>
              <Text style={styles.body}>{item.fecha.substring(0, 10)}</Text>
            </View>
            <View>
              <Text style={styles.asunto}>{item.asunto}</Text>
              <Text style={styles.body}>{item.cuerpo}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  userAvatar: {
    backgroundColor: "#bcbec1",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
    marginRight: 10
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
    flex: 1
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
  },
  button:{
    padding: 10, 
    backgroundColor: 'blue',
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius:4,
    flexGrow: 1,
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default graphql(RESPONSE_MESSAGE)(Mensaje)
