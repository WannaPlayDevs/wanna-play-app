import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, Image, StatusBar } from 'react-native'
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
  {
    "id": 3,
    "name": "The Sims 3",
  },
  {
    "id": 4,
    "name": "Grand Theft Auto V",
  },
]

class Perfil extends Component {

  render() {
    const { data } = this.props
    console.log(data)
    return (
      <ScrollView>
        <StatusBar hidden={true} />
        <View style={{ alignItems: 'center' }}>
          <View style={styles.userAvatarContainer}>
            <Image
              style={styles.userAvatar}
              source={require('../../assets/images/default-avatar_800x.jpg')}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Ina Vanilla</Text>
            <Text>@vanilla_ina</Text>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.section}>
              <Text>Availability</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Afternoons</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Evenings</Text>
            </View>
            <View style={styles.section}>
              <Text>Age</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>23</Text>
            </View>
            <View style={styles.section}>
              <Text>Language</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Polski</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>English</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Spanish</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 25 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink', borderRadius: 50, marginHorizontal: 5, width: 30, height: 30 }}>
              <Text style={{ color: 'white' }}>M</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink', borderRadius: 50, marginHorizontal: 5, width: 30, height: 30 }}>
              <Text style={{ color: 'white' }}>T</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
              <Text style={{ textAlign: 'center' }}>W</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
              <Text style={{ textAlign: 'center' }}>T</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink', borderRadius: 50, marginHorizontal: 5, width: 30, height: 30 }}>
              <Text style={{ color: 'white' }}>F</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
              <Text style={{ textAlign: 'center' }}>S</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink', borderRadius: 50, marginHorizontal: 5, width: 30, height: 30 }}>
              <Text style={{ color: 'white' }}>S</Text>
            </View>
          </View>
          <View>
            <FlatList
              data={gamesList}
              renderItem={({item}) => <Text style={{ marginBottom: 15,textAlign: 'center' }}>{item.name}</Text>}
            />
          </View>
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
    marginTop: 50,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },

})

export default graphql(ME_QUERY)(Perfil)
