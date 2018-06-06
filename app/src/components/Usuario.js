import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native';

class Usuario extends Component {
  render() {
    const {item} = this.props
    return (
      <TouchableOpacity onPress={() => console.log('pulsado')}>
        <View style={styles.container}>
          <Text style={styles.userAvatar}></Text>
          <View style={styles.datos}>
            <Text style={styles.textName}>{item.username}</Text>
            <Text>@{item.alias}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    marginBottom: 3,
  },
  datos: {
    justifyContent: 'space-between'
  },
  textName: {
    fontSize: 20,
  }
})

export default Usuario
