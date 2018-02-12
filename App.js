import React, { Component } from 'react';
import { Dimensions, Text , FlatList, View, Button, AppRegistry, StyleSheet, ListView } from 'react-native';
import AppHeader from './src/components/appHeader';
import AppBody from './src/components/appBody';
import AppFooter from './src/components/appFooter';
import { AppMap } from './src/components/appMap';
import AppJson from "./src/components/appJson"
import Expo from 'expo';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button
                    title = "Navigate to Profile"
                    onPress= { ()=> navigate('Profile') }>
                </Button>
                
            </View>
        )
    }
}

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'ProfileScreen',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button
                    title = " Navigate to Home"
                    onPress= { ()=> navigate('Home') }>
                </Button>
                <AppJson/>
            </View>
        )
    }
}

const NavigationApp = StackNavigator({
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
}, {
    navigationOptions: {
        headerStyle: {
            marginTop: Expo.Constants.statusBarHeight
        }
    }
})

export default class lucky7app extends React.Component{
    render() {
        return (
            <NavigationApp />
        )
    }
}


        AppRegistry.registerComponent('lucky7app',()=> 'lucky7app');
