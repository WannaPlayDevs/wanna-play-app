import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Links extends Component {

    renderVotes (){
        const {item} = this.props
        const votos = item.votes

        if (votos.length > 0){
            console.log(item)
            return(
                <View>
                    <Text>Hola</Text>
                <Text>id --> {votos[0].user.username} </Text>                
                </View>
            )
        }
    }

  render() {
    const {item} = this.props
    return (
      <View style={{paddingTop: 20}}>
        <Text>{item.id} </Text>
        <Text>{item.url} </Text>
        <Text>{item.description} </Text>
        {this.renderVotes()}
        <Text>{item.votes.length}</Text>
      </View>
    );
  }
}

export default Links;
