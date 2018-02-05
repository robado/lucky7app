import React, { Component } from 'react';
import { Dimensions, Text , FlatList, View, Button, AppRegistry, StyleSheet, ListView } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AppHeader from './src/components/appHeader';
import AppBody from './src/components/appBody';
import AppFooter from './src/components/appFooter';
import {AppMap} from './src/components/appMap';


export default class lycky7app extends Component{
    render() {
        return (
            <View>
                <AppHeader/>
                <AppBody/>
                <AppMap/>
                <AppFooter/>
            </View>
        )
    }
}
        AppRegistry.registerComponent('lucky7app',()=> 'lucky7app');
