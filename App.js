import React, { Component } from 'react';
import { Dimensions, Text , FlatList, View, Button, AppRegistry, StyleSheet, ListView } from 'react-native';
import AppHeader from './src/components/appHeader';
import AppBody from './src/components/appBody';
import AppFooter from './src/components/appFooter';
import { AppMap } from './src/components/appMap';
import GooglePlacesInput from './src/components/AppPlaces'
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
                    title = "Avaa Maps"
                    onPress= { ()=> navigate('Maps') }>
                </Button>
                <Button
                    title = "Avaa Json"
                    onPress= { ()=> navigate('Json') }>
                </Button>
                <Button
                    title = "Avaa Places"
                    onPress= { ()=> navigate('Places') }>
                </Button>

            </View>
        )
    }
}

class MapsScreen extends React.Component {
    static navigationOptions = {
        title: 'ProfileScreen',
    };
    render() {

        return (
            <AppMap/>

        )
    }
}


class JsonScreen extends React.Component {
    static navigationOptions = {
        title: 'JsonScreen',
    };
    render() {

        return (
            <AppJson/>
        )
    }
}
class PlacesScreen extends React.Component {
    static navigationOptions = {
        title: 'PlacesScreen',
    };
    render() {

        return (
            <GooglePlacesInput/>
        )
    }
}

const NavigationApp = StackNavigator({

    Home: {screen: HomeScreen},
    Maps: {screen: MapsScreen},
    Json: {screen: JsonScreen},
        Places: {screen: PlacesScreen}
}, {
    navigationOptions: {
        headerStyle: {
            marginTop: Expo.Constants.statusBarHeight
        }
    }
}
)

export default class lucky7app extends React.Component{
    render() {

        return (
            <NavigationApp />

        )
    }
}


        AppRegistry.registerComponent('lucky7app',()=> 'lucky7app');
