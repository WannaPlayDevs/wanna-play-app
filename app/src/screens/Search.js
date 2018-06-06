import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';

import { logout } from '../actions/user';

class Search extends Component{

  _logout = () => {
    console.log('onlogout', this.props)
    this.props.client.resetStore()
    return this.props.logout();
  }

  render(){
    console.log('profile antes de logout', this.props.client)
    return(
      <View style={{ paddingVertical: 20 }}>
        <Card title="John Doe">
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="LOG OUT"
            onPress={this._logout}
          />
        </Card>
      </View>
    )
  }
}
// export default connect(undefined, { logout })(Profile)
export default withApollo(connect(undefined, { logout })(Search));

