import React, { Component } from 'react'
import { createRootNavigator } from './router'
import { isLoggedIn } from './auth'

import { ApolloProvider } from 'react-apollo';
import { store, client } from './src/store';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      checkedLoggedIn: false
    }
  }

  componentDidMount() {
    isLoggedIn()
      .then(res => this.setState({ loggedIn: res, checkedLoggedIn: true }))
      .catch(err => alert("An error occurred"))
  }

  render() {
    const { checkedLoggedIn, loggedIn } = this.state

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedLoggedIn) {
      return null
    }

    const Layout = createRootNavigator(loggedIn)
    return(
      <ApolloProvider store={store} client={client}>
        <Layout />        
      </ApolloProvider>
    )
  }
}