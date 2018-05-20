import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {graphql} from 'react-apollo';

import GET_LINKS from '../graphql/queries/getLinks'
import Links from '../components/Links'

class Home extends Component {

  _renderItem = ({ item }) => <Links item={item}/>

  render(){
    const { data } = this.props
    return (
      <FlatList
        data ={data.links}
        keyExtractor={item => item.id}
        renderItem={this._renderItem}
      />
    )
  }  
}

export default graphql(GET_LINKS)(Home)