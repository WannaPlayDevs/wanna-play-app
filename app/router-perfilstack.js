import React, { Component } from 'react'
import { Platform, StatusBar } from 'react-native'
import { StackNavigator} from 'react-navigation'

import Perfil from './src/screens/Perfil'
import PerfilEdit from './src/screens/PerfilEdit'


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
        }
      }
    }
  )

export default PerfilStack 