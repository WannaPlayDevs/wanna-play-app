import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

export default class Games extends Component {
  render() {
    const { name, imagen } = this.props
    return (
      <View style={styles.container}>
        <Image
          style={styles.userAvatar}
          source={{uri: 'https://media.discordapp.net/attachments/291661905989206017/453640073246801922/150.png'}}
        />
        <View style={styles.datos}>
          <Text style={styles.textName}>{name}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
    resizeMode: 'stretch'
  },
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    marginBottom: 3,
    alignItems: 'flex-start'
  },
  datos: {
    flex: 1,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textName: {
    fontSize: 20,
  }
})