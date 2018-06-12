import React, { Component } from 'react'
import { Text, View, FlatList, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { graphql } from 'react-apollo'
import { CheckBox, Card, Divider } from 'react-native-elements'
import Emoji from 'react-native-emoji'
  
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
    noche: false,
    error: ''
  }

  _renderAvailability(item){
    return(
    <View style={{flexDirection: 'row'}}>
      {item && item.horarioManana ? <Text style={{ fontSize: 30, marginHorizontal: 10 }}><Emoji name="sunrise"/></Text> : <Text style={{opacity: 0.3, marginHorizontal: 10, fontSize: 30 }}><Emoji name="sunrise"/></Text>}
      {item && item.horarioNoche ? <Text style={{ fontSize: 30, marginHorizontal: 10 }}><Emoji name="city_sunset"/></Text> : <Text style={{opacity: 0.3, marginHorizontal: 10, fontSize: 30 }}><Emoji name="city_sunset"/></Text>}
      {item && item.horarioTarde ? <Text style={{ fontSize: 30, marginHorizontal: 10 }}><Emoji name="night_with_stars"/></Text> : <Text style={{opacity: 0.3, marginHorizontal: 10, fontSize: 30 }}><Emoji name="night_with_stars"/></Text>}
    </View>
    )
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("UserDetail", { data: item })}>
        <Card style={styles.card}>
          <Text style={styles.textAvailability}>{item.alias}</Text>
          {this._renderAvailability(item)}
        </Card>
      </TouchableOpacity>
    )
  }

  render() {
    const { data } = this.props
    return (
      <ScrollView
        ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight)=>{        
            this.scrollView.scrollToEnd({animated: true});
        }}
      >
        <View style={styles.container}>
          <View>
            <Text>Find fellow players by name...</Text>
            <TextInput 
                style={{borderColor: 'gray', borderWidth: 1, marginVertical: 5, padding: 10, borderRadius: 10}}
                placeholder='Username'
                underlineColorAndroid='transparent'
                maxLength={30}
                onChangeText={(text) => this.setState({text})}
            />
            <TouchableOpacity 
              style={styles.button} 
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
              })}>
              <Text style={styles.buttonText}>FIND</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>...or by game and availability</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='Wow'
                  checked={this.state.wow}
                  checkedColor='#3377F4'
                  onPress={() => this.setState({wow: !this.state.wow})}
                />
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='GTA'
                  checked={this.state.gta}
                  checkedColor='#3377F4'
                  onPress={() => this.setState({gta: !this.state.gta})}
                />
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='OverWatch'
                  checked={this.state.over}
                  checkedColor='#3377F4'
                  onPress={() => this.setState({over: !this.state.over})}
                />
              </View>
              <View style={{flex:1}}>
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='Rust'
                  checked={this.state.rust}
                  checkedColor='#3377F4'
                  onPress={() => this.setState({rust: !this.state.rust})}
                />
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='Fortnite'
                  checked={this.state.fort}
                  checkedColor='#3377F4'
                  onPress={() => this.setState({fort: !this.state.fort})}
                />
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='PUBG'
                  checked={this.state.pubg}
                  checkedColor='#3377F4'
                  onPress={() => this.setState({pubg: !this.state.pubg})}
                />
              </View>
            </View>
            <Divider style={{ backgroundColor: 'grey', marginVertical: 10 }} />
            <View style={{flexDirection: 'row', justifyContent:'center', flexWrap: 'wrap'}}>
              <CheckBox
                containerStyle={{flexGrow: 1, alignItems: 'center', backgroundColor: 'transparent'}}
                title='Morning'
                checked={this.state.manana}
                checkedColor='#3377F4'
                onPress={() => this.setState({manana: !this.state.manana})}
              />
              <CheckBox
                containerStyle={{flexGrow: 1, alignItems: 'center', backgroundColor: 'transparent'}}
                title='Afternoon'
                checked={this.state.tarde}
                checkedColor='#3377F4'
                onPress={() => this.setState({tarde: !this.state.tarde})}
              />
              <CheckBox
                containerStyle={{flexGrow: 1, alignItems: 'center', backgroundColor: 'transparent'}}
                title='Evening'
                checked={this.state.noche}
                checkedColor='#3377F4'
                onPress={() => this.setState({noche: !this.state.noche})}
              />
            </View>
            <TouchableOpacity 
              style={styles.button}
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
              })}>
              <Text style={styles.buttonText}>FIND</Text>
            </TouchableOpacity>
            <FlatList
              data={data.filterUser}
              keyExtractor={item => item.alias}
              renderItem={this._renderItem}
              ListEmptyComponent={<Text style={{color: 'red', fontSize:20, alignSelf: 'center'}}>No results found</Text>}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 30,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
  },
  card: {
    alignItems: 'center',
    width: 100,
  },
  textAvailability: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5
  },
  button:{
    width: '100%', 
    padding: 10, 
    backgroundColor: '#3377F4',
    marginVertical: 10,
    borderRadius:4
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
})

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