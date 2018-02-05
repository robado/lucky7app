import React, { Component } from 'react';
import { Dimensions, Text , FlatList, View, Button, AppRegistry, StyleSheet, ListView } from 'react-native';
import AppHeader from './src/components/appHeader';
import AppBody from './src/components/appBody';
import AppFooter from './src/components/appFooter';
import {AppMap} from './src/components/appMap';
import AppJson from "./src/components/appJson"


export default class lucky7app extends Component{
    render() {
        return (
            <View>
                <AppHeader/>
                <AppMap/>
                <AppBody/>
                <AppJson/>
                <AppFooter/>
            </View>
        )
    }
}
        AppRegistry.registerComponent('lucky7app',()=> 'lucky7app');
