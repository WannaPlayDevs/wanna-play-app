import React, { Component } from 'react'
import { Text, View, FlatList, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { graphql } from 'react-apollo'
import { CheckBox, Card, Divider } from 'react-native-elements'
 
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
    <View>
      {item && item.horarioManana ? <Text style={styles.textAvailability}>Mornings</Text> : null}
      {item && item.horarioNoche ? <Text style={styles.textAvailability}>Evenings</Text> : null}
      {item && item.horarioTarde ? <Text style={styles.textAvailability}>Afternoons</Text> : null}
    </View>
    )
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("UserDetail", { data: item })}>
        <Card style={styles.card}>
          <Text>{item.alias}</Text>
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
                placeholder='Subject'
                underlineColorAndroid='transparent'
                maxLength={30}
                onChangeText={(text) => this.setState({text})}
            />
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => {this.props.data.refetch({
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
              });this.setState({error:"No results found"})}}>
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
                  onPress={() => this.setState({wow: !this.state.wow})}
                />
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='GTA'
                  checked={this.state.gta}
                  onPress={() => this.setState({gta: !this.state.gta})}
                />
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='OverWatch'
                  checked={this.state.over}
                  onPress={() => this.setState({over: !this.state.over})}
                />
              </View>
              <View style={{flex:1}}>
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='Rust'
                  checked={this.state.rust}
                  onPress={() => this.setState({rust: !this.state.rust})}
                />
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='Fortnite'
                  checked={this.state.fort}
                  onPress={() => this.setState({fort: !this.state.fort})}
                />
                <CheckBox
                  containerStyle={{flexGrow: 1, backgroundColor: 'transparent'}}
                  title='PUBG'
                  checked={this.state.pubg}
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
                onPress={() => this.setState({manana: !this.state.manana})}
              />
              <CheckBox
                containerStyle={{flexGrow: 1, alignItems: 'center', backgroundColor: 'transparent'}}
                title='Afternoon'
                checked={this.state.tarde}
                onPress={() => this.setState({tarde: !this.state.tarde})}
              />
              <CheckBox
                containerStyle={{flexGrow: 1, alignItems: 'center', backgroundColor: 'transparent'}}
                title='Evening'
                checked={this.state.noche}
                onPress={() => this.setState({noche: !this.state.noche})}
              />
            </View>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => {this.props.data.refetch({
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
              });this.setState({error:"No results found"})}}>
              <Text style={styles.buttonText}>FIND</Text>
            </TouchableOpacity>
            <FlatList
              data={data.filterUser}
              keyExtractor={item => item.alias}
              renderItem={this._renderItem}
              ListEmptyComponent={<Text style={{color: 'red', fontSize:20, alignSelf: 'center'}}>{this.state.error}</Text>}
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
    backgroundColor: 'blue',
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