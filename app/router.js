import React, { Component } from 'react'
import { Platform, StatusBar, Text, AsyncStorage } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  SwitchNavigator,
  addNavigationHelpers
} from 'react-navigation'
import { FontAwesome } from 'react-native-vector-icons'
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import Landing from './src/screens/Landing'
import LogIn from './src/screens/LogIn'
import SignUp from './src/screens/SignUp'
import Mensajes from './src/screens/Mensajes'
import Search from './src/screens/Search'
import PerfilStack from './router-perfilstack'
import prueba from './src/screens/prueba'
import Users from './src/screens/Users'

import getUserInfo  from './src/actions/user'

import { addListener } from './nav';

import ME from './src/graphql/queries/me'

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
}

export const LoggedOut = StackNavigator(
  {
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
  }
)
// const {info} = this.props.info

export const LoggedIn = TabNavigator(
  {
    Profile: {
      screen: PerfilStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='user' size={30} color={tintColor} />
        )
      }
    },
    Messages: {
      screen: Mensajes,
      navigationOptions: {
        tabBarLabel: 'Messages',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='envelope' size={30} color={tintColor} />
        ),
      }
    },
    Search: {
      screen: Users,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='search' size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)

const AppMainNav = StackNavigator(
  {
    Home: {
      screen: LoggedIn,
      navigationOptions: ({ navigation }) => ({
        header:null
      }),
    },
  },
);

class AppNavigator extends Component {

  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener
    });
    if (!this.props.user.isAuthenticated) {
      return <LoggedOut />;
    }
    return <AppMainNav navigation={nav} />;
  }
}

export default connect(state => ({
  info: state.user.info,
  nav: state.nav,
  user: state.user,
}))(AppNavigator);

export const router = AppMainNav.router;