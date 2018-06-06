import React, { Component } from 'react'
import { Platform, StatusBar } from 'react-native'
import { StackNavigator} from 'react-navigation'

import Perfil from './src/screens/Perfil'
import PerfilEdit from './src/screens/PerfilEdit'

const headerStyle = {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
}

const PerfilStack = StackNavigator(
    {
      Main: {
        screen: Perfil,
        navigationOptions: {
            header: null,
        }
      },
      Edit: {
        screen: PerfilEdit,
        navigationOptions: {
          title: "Edit",
          headerStyle
        }
      }
    }
  )

export default PerfilStack 