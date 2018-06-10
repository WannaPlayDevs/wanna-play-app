import React, { Component } from 'react';
import { View, FlatList, AsyncStorage, Text } from 'react-native';
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import me from '../graphql/queries/me'
import Mensaje from '../components/Mensaje'

class Mensajes extends Component {

  _renderItem = ({ item }) => <Mensaje mensaje item={item} />

  render() {
    const { data } = this.props

    if(data.misMensajes && data.misMensajes.length == 0){
      return <Text>Your inbox is empty</Text>
    }

    return (
      <FlatList
        style={{ marginTop: 10 }}
        data={data.misMensajes}
        keyExtractor={item => item.pkMensaje}
        renderItem={this._renderItem}
      />
    )
  }
}

const mensajeQuery = gql`
query misMensajes($fkDestinatario: String!) {
  misMensajes(fkDestinatario: $fkDestinatario) {
    cuerpo
    asunto
    fecha
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
