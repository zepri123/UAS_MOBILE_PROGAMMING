



import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";
import DrawerNavigator from './Navigation/DrawerNavigator';





export default class App extends React.Component {
 
  componentWillMount () {
    firebase.initializeApp({
     apiKey:"AIzaSyCcsVUzGbjvBN8u9wQx-_tP9Bj-9TowKdE",
     authDomain: "expo2-2979a.firebaseapp.com",
     databaseURL:"https://expo2-2979a.firebaseio.com",
     projectId:"expo2-2979a",
     storageBucket:"expo2-2979a.appspot.com",
     messagingSenderId:"1040777801494"
    });

    

   

}

 


// ini aja atau salah 1
render() {
  return (

    <DrawerNavigator />
   
  );
}


}


