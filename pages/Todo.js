import React from 'react';
import { TouchableHighlight, View, Text,StyleSheet } from 'react-native';
import MenuButton from '../components/MenuButton'
export default class Todo extends React.PureComponent {
    _updateTodo=()=>{
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    render() {
        return (
            
            <TouchableHighlight
                onPress={this._updateTodo}>
                <View style={{ flex: 1,height:50, flexDirection: 'row' }}>
                    <View style={{flex:8}}>
                        <Text>{this.props.title}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        {this.props.complete && (
                            <Text>COMPLETE</Text>
                        )}
                    </View>
                </View>
            </TouchableHighlight>
           
        );
    }
}


const styles=StyleSheet.create({

    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  
  })