import React from "react";
import {
    Platform,
    Dimensions
} from 'react-native';
import {
    createSwitchNavigator, 
    createStackNavigator, 
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import Icon from "@expo/vector-icons/Ionicons";
import HomeScreen from '../pages/HomeScreen';
import InfoScreen from '../pages/InfoScreen';
import ProfileScreen from '../pages/ProfileScreen';

import AuthLoadingScreen from '../pages/AuthLoadingScreen';


import MenuDrawer from "../components/MenuDrawer";
import LocationScreen from "../pages/LocationScreen";
import  TodosScreen  from "../pages/TodosScreen";
import  ContactScreen  from "../pages/ContactScreen";
import SignInScreen from '../pages/LoginPages';

import firebase from 'firebase';

const WIDTH = Dimensions.get('window').width;


const AuthStack = createStackNavigator({SignIn: SignInScreen},{ headerMode :'none'});

const DrawerConfig = {
        drawerWidth: WIDTH * 0.75,
        contentComponent: ({
            navigation
        }) => {
            return ( < MenuDrawer navigation = {
                    navigation
                }
                /> )
            }
        }

        const Tabs = createBottomTabNavigator({
            Home: {
                screen: HomeScreen,
                navigationOptions: {
                    tabBarLabel: "Home",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="ios-home" size={30}  />
                    ), tabBarOptions: {
                        showIcon: true,
                        activeTintColor: '#e91e63'
                    },
                }
            },
            Info: {
                screen: InfoScreen,
                navigationOptions: {
                    tabBarLabel: "Info",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="ios-information-circle" size={30}  />
                    ), tabBarOptions: {
                        showIcon: true,
                        activeTintColor: '#e91e63'
                    },
                }
            },
            
            
            Contact: {
                screen: ContactScreen,
                navigationOptions: {
                    tabBarLabel: "Contact",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="md-contact" size={30}  />
                    ), tabBarOptions: {
                        showIcon: true,
                        activeTintColor: '#e91e63'
                    },
                }
            }
            
           
        
           
        }, {
            tabBarOptions: {

                activeTintColor: '#000',
                inactiveTintColor: 'gray',
                style: {
                    height: 50,
                    fontSize: 40,
                    fontSize: 40,
                    backgroundColor: 'white',
                },
                indicatorStyle: {
                    height: 50,
                    fontSize: 30,
                    backgroundColor: '#fff',
                },
            }
        });

        const DrawerNavigator = createDrawerNavigator({
                Home: {
                    screen: Tabs
                },
               

                Profile: {
                    screen: ProfileScreen
                },
                Todos: {
                    screen: TodosScreen
                },
                Location:{
                    screen : LocationScreen
                }
                


            },
            DrawerConfig
        );

        
const AppStack = createStackNavigator(
    {    
        AppNav: {
            screen: DrawerNavigator,
            navigationOptions: {
                header: null,
            }
        }
    });

    export default createAppContainer(createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    ));
    
  