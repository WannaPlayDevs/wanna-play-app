import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, Image } from 'react-native'
import { graphql } from 'react-apollo'

import ME_QUERY from '../graphql/queries/me'

const gamesList = [
  {
    "id": 1,
    "name": "Counter Strike",
  },
  {
    "id": 2,
    "name": "Overwatch",
  },
]

class Perfil extends Component {

  render() {
    const { data } = this.props
    console.log(data)
    return (
      <ScrollView>
        <View style={styles.userAvatarContainer}>
          <Image
            style={styles.userAvatar}
            source={require('../../assets/images/default-avatar_800x.jpg')}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 15 }}>Ned Bienes</Text> {/* alias */}
          <Text>@ned_bienes</Text> {/* username */}
        </View>
        <View style={styles.userInfo}>
          <View style={styles.section}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 15 }}>Mañana</Text>
            <Text>Disponibilidad</Text> 
          </View>
          <View style={styles.section}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 15 }}>Casual</Text>
            <Text>Estilo de juego</Text> 
          </View>
        </View>
        <View>
          <FlatList
            data={gamesList}
            renderItem={({item}) =><Text style={{ marginBottom: 15,textAlign: 'center' }}>{item.name}</Text>}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  userAvatarContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
    justifyContent: 'space-around',
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
})

export default graphql(ME_QUERY)(Perfil)
