import React, { Component } from 'react'
import { createRootNavigator } from './router'
import { isLoggedIn } from './auth'
import { AppLoading } from 'expo';
import { AsyncStorage } from 'react-native'
 
import { ApolloProvider } from 'react-apollo';
import { store, client } from './src/store';

import { login } from './src/actions/user';

import AppNavigation from './router'

export default class App extends Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._checkIfToken();
  }

  _checkIfToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (token != null) {
        store.dispatch(login());
      }
    } catch (error) {
      throw error;
    }

    this.setState({ appIsReady: true });
  };

  render() {
    console.disableYellowBox = true
    // const Layout = createRootNavigator(true)
    if (!this.state.appIsReady) {
      return <AppLoading />;
    }
    return(
      <ApolloProvider store={store} client={client}>
        <AppNavigation />        
      </ApolloProvider>
    )
  }
}