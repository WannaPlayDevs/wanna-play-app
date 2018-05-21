import React from 'react'
import { Platform, StatusBar } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from 'react-navigation'
import { FontAwesome } from 'react-native-vector-icons'

import Landing from './src/screens/Landing'
import LogIn from './src/screens/LogIn'
import SignUp from './src/screens/SignUp'
import Home from './src/screens/Home'
import Profile from './src/screens/Profile'
import Perfil from './src/screens/Perfil'

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
}

export const LoggedOut = StackNavigator({
  Landing: {
    screen: Landing,
    navigationOptions: {
      header: null,
    }
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: "Log In",
      headerStyle
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  }
})

export const LoggedIn = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='home' size={30} color={tintColor} />
        ),
        headerStyle
      }
    },
    Profile: {
      screen: Perfil,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='user' size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }
    }
  }
)

export const createRootNavigator = (loggedIn = false) => {
  return SwitchNavigator(
    {
      LoggedIn: {
        screen: LoggedIn
      },
      LoggedOut: {
        screen: LoggedOut
      }
    },
    {
      initialRouteName: loggedIn ? 'LoggedIn' : 'LoggedOut'
    }
  )
}