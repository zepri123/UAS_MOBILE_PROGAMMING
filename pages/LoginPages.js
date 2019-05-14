import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Image, TextInput, Button,Text,ImageBackground } from "react-native";
import firebase from "firebase";
import Spinner from "./Spinner";
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '', error: '', success: '', loading: false };
    }

    _onPressLogin = () => {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(data => {
                this.setState({ error: '', success: 'Authentication success!', loading: false });
                this.props.navigation.navigate('App');
                console.log(data.user)
            })
            .catch(e => {
                console.log(e)
                this.setState({ error: 'Authentication failed.', success: '', loading: false });
            });
    }
    _onPressCancel = () => {
        
        this.setState({ email: '' })
        this.setState({ password: '' })
        this.setState({ error: '', success: '', loading: false });

    }

    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <Spinner />;
        }
        return <Button onPress={this._onPressLogin.bind(this)} title="Log in" />;
    }

    render() {
        return (
              
            <ImageBackground source={require('../assets/bgyellow.jpg')}style={{width: '100%', height: '100%'}}> 
             <Image source={require('../assets/r.png')} style={styles.image}></Image>
            <KeyboardAvoidingView style={styles.container} 
            
            behavior="padding" enabled >
             
               
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                <Text style={styles.successTextStyle}>{this.state.success}</Text>


               
                <TextInput
                    value={this.state.email}
                    onChangeText={(inputan) => this.setState({ email: inputan })}
                    style={styles.email} placeholder="email..."></TextInput>
                <TextInput
                    value={this.state.password}
                    onChangeText={(inputan) => this.setState({ password: inputan })}
                    style={styles.email} placeholder="Password,,," secureTextEntry={true}></TextInput>
                <View style={styles.button}>
                    {this.renderButtonOrSpinner()}
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={this._onPressCancel}
                        title="Cancel"></Button>
                </View>
                
                
              
            </KeyboardAvoidingView>
             </ImageBackground>  
           
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'',
    },
    image: {
        width: 170,
        height: 150,
        marginBottom: 70,
        alignItems: 'center',
         marginLeft: 120,
        marginTop: 100,
    },
    email: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '90%',
        padding: 5,
        alignItems: 'center',
        marginBottom: 10,
       
        // marginLeft: 20,
        // marginTop: 20,
    },
    button: {
        width: '90%',
        marginBottom: 10,
        // marginLeft: 20,
    },
    errorTextStyle: {
        color: '#E64A19',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    successTextStyle: {
        color: '#33691e',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
    }
});