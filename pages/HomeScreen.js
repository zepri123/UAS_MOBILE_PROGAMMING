import React from 'react';
import{ImagePicker,Permissions} from 'expo';

import{Platform,
    Image,Dimensions,
    StyleSheet,View,
    Text,TouchableOpacity
    ,KeyboardAvoidingView,Button,Alert,TextInput,
    ImageBackground} from 'react-native';

import MenuButton from '../components/MenuButton'
import firebase from "firebase";
import Spinner from "./Spinner";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class HomeScreen extends React.Component{

    constructor(props){
        super(props)
        this.state={
            image:'http://bit.ly/2YnwaYS',
            hasCameraPermission:null,
            hasCameraRollPermission:null,

              
            name: null,
            email: null,
            photoUrl: null,
            password:null,
        }
    }

    componentDidMount() {
        this._getCurrentUser();
    }

    _getCurrentUser = async () => {
        let user = await firebase.auth().currentUser;
        console.log(user);
        if (user != null) {
            this.setState({
                password:user.password,
                name: user.name,
                email: user.email,
                photoURL: user.photoURL
            })
        }
    }

    _updateProfile = () => {
        this.setState({loading:true})
        var user = firebase.auth().currentUser;
        var credential;

        user.updateProfile({
            displayName: this.state.name,
           
          
        }).then(function () {
            Alert.alert('Success', 'Update Data successfull')
        }).catch(function (error) {
            Alert.alert('Error', 'Error happened')
        });

        
        
        user.updateEmail(this.state.email).then( (user) => {
            Alert.alert('Success','Email update')
        }).catch(function (error) {
            Alert.alert('Error', 'Error happened')
        });
        this.setState({ loading: false })
    }
    _renderButtonOrSpinner = () => {
        if (this.state.loading) {
            return <Spinner />;
        }
        return <Button onPress={this._updateProfile} title="Update" />;
    }


    //kamera
  async componentWillMount(){
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission:status === 'granted'});

    const {statusCameraRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({hasCameraRollPermission:statusCameraRoll === 'granted'});
  }

    navLink(nav,text){
        return(
            <TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
            <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }

    _pickImage = async ()=>{
        // let result = await ImagePicker.launchImageLibraryAsync({
            let result = await ImagePicker.launchCameraAsync({
            allowsEditing:true,
            aspect:[1, 1],
        });
        if (!result.cancelled){
            this.setState({ image:result.uri});
        }

    };
    render(){
        return(


            <ImageBackground source={require('../assets/home.png')}style={{width: '100%', height: '100%'}}> 
            <View style={styles.container}>
             <MenuButton navigation ={this.props.navigation}/>
            
              
           
             <View style={styles.profile}>
             <TouchableOpacity style={styles.imgView} onPress={this._pickImage}>
            <Image style={styles.img}source={{uri:this.state.image}}/>
            </TouchableOpacity>
           
            </View>

            <Text style={{marginBottom: 90,marginLeft: 130,}}>Silahkan ganti foto anda</Text>
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} behavior="padding" enabled>
           
                 
                <TextInput style={{ width: '90%', borderRadius: 2, borderColor: "white", backgroundColor:"white",marginBottom: 20,}} value={this.state.name} onChangeText={(text) => { this.setState({ name: text }) }} placeholder="Name" />
                <TextInput style={{ width: '90%', borderRadius: 5, borderColor: "grey",backgroundColor:"white",marginBottom: 20, }} value={this.state.email} onChangeText={(text) => { this.setState({ email: text }) }} placeholder="Email" />
               
                <View style={{width:'90%', marginBottom: 10}}>
                    {this._renderButtonOrSpinner()}
                </View>
               
                <View style={{width:'90%', marginBottom: 40}}>
                <Button title="Sign Out" onPress={this._signOutAsync} />
                </View>
            </KeyboardAvoidingView>


             </View>
             </ImageBackground>
            
            
            
            
         

           

           

        
          
            
        );


    }

_signOutAsync = () => {
    firebase.auth().signOut().then(function () {
        this.props.navigation.navigate('Auth');
    }).catch(function (error) {
        console.log(error)
    });
};
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'lightgray',
    },
    scrool:{
        flex:1,

    },
    img:{
        height:70,
        width:70,
        borderRadius:50,

    },
 name:{
      fontSize:20,
      paddingBottom: 5,
      color: 'white',
      textAlign : 'left',
    },
    profile:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
       
       

    },
    imgView:{
        flex:1,
        paddingLeft:20,
        paddingRight: 20,

    },
    topLinks:{
        height:160,
        backgroundColor:'black',
    },
    

    link:{
        flex:1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign:'left',
    },
    img:{
        height:100,
        width:100,
        borderRadius:50,

    },

   
})