import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {graphql} from 'react-apollo';

import GET_USERS from '../graphql/queries/getUsers'
import Usuario from '../components/Usuario'

class Home extends Component {

  _renderItem = ({ item }) => <Usuario item={item}/>

  render(){
    const { data } = this.props
    return (
      <FlatList
        style={{marginTop: 30}}
        data ={data.users}
        keyExtractor={item => item.id}
        renderItem={this._renderItem}
      />
    )
  }  
}

export default graphql(GET_USERS)(Home)