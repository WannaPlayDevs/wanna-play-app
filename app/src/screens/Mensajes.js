import React, { Component } from 'react';
import { View, FlatList, AsyncStorage, Text } from 'react-native';
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

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

  render() {
    const { data } = this.props
    console.log('Mensajes', this.props)
    console.log("fk", this.props)

    if(data.misMensajes && data.misMensajes.length == 0){
      return <Text>No tienes ningun mensaje!</Text>
    }

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
      pkUser
      username
      alias
    }
    fkDestinatario{
      pkUser
    }
  }
}
`
const MensajeWithData = graphql(mensajeQuery, {  
  options: (props)=>({
    variables: {
      fkDestinatario: props.info.pkUser
    }
  })
})(Mensajes)

export default connect(state => ({info: state.user.info}))(MensajeWithData)
