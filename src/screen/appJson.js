import React, { Component } from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import AppJsondata from "../components/appJsondata";
import AppWeather from "../components/appWeather";
import AppCamera from "../components/appCamera";
import {AppMap} from "./appMap";
export default class AppJson extends Component {
    componentDidMount(){
        this.forceUpdate();
    }

    render(){
        return(
                <ScrollView>
                    <View>
                        <AppJsondata/>
                        <AppWeather/>
                        <AppCamera/>
                    </View>
                </ScrollView>
        );
    }
}
module.exports = AppJson;