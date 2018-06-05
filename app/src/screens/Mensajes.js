import React, { Component } from 'react';
import { View, FlatList, AsyncStorage, Text } from 'react-native';
import { graphql, gql } from 'react-apollo';

import me from '../graphql/queries/me'
import Mensaje from '../components/Mensaje'

const value=''

// console.log(pepe)
class Mensajes extends Component {

  _renderItem = ({ item }) => <Mensaje mensaje item={item} />
  
  
  /*getAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('@id');
    } catch (error) {
      throw error
    }

    <FlatList
        style={{ marginTop: 30 }}
        data={data.users}
        keyExtractor={item => item.id}
        renderItem={this._renderItem}
      />
  }*/
  _keyExtractor = (item, index) => item.id;

  render() {
    const { data } = this.props
    console.log("fk", this.props.fk)
    return (
      <FlatList
        style={{ marginTop: 30 }}
        data={data.misMensajes}
        keyExtractor={item => item.pkMensaje}
        renderItem={this._renderItem}
      />
    )
  }
}

// const fkDestinatario = this.state.fkDestinatario

const mensajeQuery = gql`
query misMensajes($fkDestinatario: String!) {
  misMensajes(fkDestinatario: $fkDestinatario) {
    cuerpo
    asunto
    fkRemitente{
      username
      alias
    }
  }
}
`
const MensajeWithData = graphql(mensajeQuery, {  
  options: (props)=>({
    variables: {
      fkDestinatario: props.fk
    }
  })
})(Mensajes)

export default MensajeWithData
