import React, { Component } from 'react'
import { Platform, StatusBar } from 'react-native'
import { StackNavigator} from 'react-navigation'

import FiltroUsuarios from './src/screens/Users'
import PerfilDetalle from './src/screens/PerfilDetalle'


const FiltroStack = StackNavigator(
    {
      Main: {
        screen: FiltroUsuarios,
        navigationOptions: {
            title: "Search players",
        }
      },
      UserDetail: {
        screen: PerfilDetalle,
      }
    }
  )

export default FiltroStack 