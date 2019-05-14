import React, { Component } from 'react'
import { ActivityIndicator, View,StatusBar,AsyncStorage } from 'react-native'
 import firebase from "firebase";

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  
    this._checkState();

    
       
    }


    _checkState =  () =>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('App')
            }else{
                this.props.navigation.navigate('Auth')
            }
        });

      
    };

    render(){
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
  }
  

