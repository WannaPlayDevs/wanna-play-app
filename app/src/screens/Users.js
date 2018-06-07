import React, { Component } from 'react'
import { Text, View, FlatList, TextInput, Button } from 'react-native'
import { graphql } from 'react-apollo'
import { CheckBox } from 'react-native-elements'
 
import FILTER_USER from '../graphql/queries/filterUser'
 
class Users extends Component {
  
  state = {
    text: '',
    wow: false,
    gta: false,
    over: false,
    rust: false,
    fort: false,
    pubg: false,
    manana: false,
    tarde: false,
    noche: false
  }

  _renderItem = ({ item }) => <Text>{item.alias}</Text>

  render() {
    const { data } = this.props
    console.log('usuarer', data)
    console.log('state user', this.state)
    return (
      <View>
        <TextInput 
          onChangeText={(text) => this.setState({text})}
        />
        <Button 
          onPress={() => this.props.data.refetch({
            alias: this.state.text, 
            playOverwatch: false, 
            playWow: false, 
            playRust: false,
            playGta: false, 
            playPubg: false, 
            playFortnite: false,
            horarioManana: false,
            horarioTarde: false,
            horarioNoche: false
          })} 
          title="Buscar por nombre!"
          />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <CheckBox
          title='Wow'
          checked={this.state.wow}
          onPress={() => this.setState({wow: !this.state.wow})}
          />
          <CheckBox
            title='GTA'
            checked={this.state.gta}
            onPress={() => this.setState({gta: !this.state.gta})}
          />
          <CheckBox
            title='OverWatch'
            checked={this.state.over}
            onPress={() => this.setState({over: !this.state.over})}
          />
          <CheckBox
              title='Rust'
              checked={this.state.rust}
              onPress={() => this.setState({rust: !this.state.rust})}
          />
          <CheckBox
            title='Fortnite'
            checked={this.state.fort}
            onPress={() => this.setState({fort: !this.state.fort})}
          />
          <CheckBox
            title='PubG'
            checked={this.state.pubg}
            onPress={() => this.setState({pubg: !this.state.pubg})}
          />
          <CheckBox
              title='Mañanas'
              checked={this.state.manana}
              onPress={() => this.setState({manana: !this.state.manana})}
          />
          <CheckBox
            title='Tardes'
            checked={this.state.tarde}
            onPress={() => this.setState({tarde: !this.state.tarde})}
          />
          <CheckBox
            title='Noches'
            checked={this.state.noche}
            onPress={() => this.setState({noche: !this.state.noche})}
          />
        </View>
        <Button 
          onPress={() => this.props.data.refetch({
            alias: "", 
            playOverwatch: this.state.over, 
            playWow: this.state.wow, 
            playRust: this.state.rust,
            playGta: this.state.gta, 
            playPubg: this.state.pubg, 
            playFortnite: this.state.fort,
            horarioManana: this.state.manana,
            horarioTarde: this.state.tarde,
            horarioNoche: this.state.noche
          })} 
            title="Busca por juego!"
          />
        <FlatList
          style={{ marginTop: 30 }}
          data={data.filterUser}
          keyExtractor={item => item.alias}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}
export default graphql(FILTER_USER, {
  options: {
      variables: {
        alias: "",
        playOverwatch: false, 
        playWow: false, 
        playRust: false,
        playGta: false, 
        playPubg: false, 
        playFortnite: false,
        horarioManana: false,
        horarioTarde: false,
        horarioNoche: false
      }
    }
  })(Users)