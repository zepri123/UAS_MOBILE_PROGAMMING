import React, { Component } from 'react';
import { KeyboardAvoidingView,TextInput,View,Button,FlatList,Text,ImageBackground } from 'react-native'

import { SQLite } from "expo";
const db = SQLite.openDatabase('db.db');

export default class ContactScreen extends Component {
    static navigationOptions = {
        title: 'Todo SQLITE'
    }
    constructor(props) {
        super(props)
        
        this.state = {
            title:'' ,
            todos:[]    
        };
        
    };
    componentDidMount() {
        db.transaction(tx =>{
            tx.executeSql(
                `create   table todos (id integer primary key not null, title text, complete int)`
            )
        },(err)=>{
            console.log(err);
            
        })
        this._getData()

    }
    
    
    render() {
        return (
            <ImageBackground source={require('../assets/bgblue.png')}style={{width: '100%', height: '100%'}}>
            <KeyboardAvoidingView behavior="padding" enabled>
                <View style={{ flexDirection: 'row', margin: 10, }}>
                    <TextInput
                        placeholder="Todos"
                        value={this.state.title}
                        onChangeText={(text) => this.setState({ title: text })}
                        style={{ width: '80%', padding: 5, borderRadius: 5, borderColor: '#ccc', borderBottomWidth: 1, }}
                    />
                    <Button
                        title="Add"
                        disabled={!this.state.title.length}
                        onPress={this._addData} />
                </View>
                <FlatList
                    data={this.state.todos}
                    renderItem={({item}) => <Text >{item.title} </Text> }
                    keyExtractor={(item, index) => item.id.toString()}
                />

            </KeyboardAvoidingView>
            </ImageBackground>
        )
    }

    _addData = ()=>{
        let title = this.state.title;
        db.transaction(tx=>{
            tx.executeSql(`insert into todos (complete,title) values (0,?) `,[title])
        },
        (error)=>{
            console.log(error)
        }, //error
        this.setState({title:''}) //success
        )
        this._getData()
    }

    _getData=()=>{
        db.transaction(tx => {
            tx.executeSql(`select * from todos`, [],(_,{rows})=>
                this.setState({ todos: rows._array })
            );
        });
        console.log(this.state.todos);
    }
}