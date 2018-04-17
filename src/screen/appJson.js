import React, { Component } from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import AppJsondata from "../components/appJsondata";
import AppWeather from "../components/appWeather";
import AppCamera from "../components/appCamera";
export default class AppJson extends Component {
    componentDidMount(){
        this.forceUpdate();
    }
    componentWillMount(){
        console.log(this.props.navigation.state.params.location);
    };

    render(){
        return(
                <ScrollView>
                    <View>
                        <AppJsondata/>
                        <AppWeather/>
                        <AppCamera location={this.props.navigation.state.params.location} />
                    </View>
                </ScrollView>
        );
    }
}
module.exports = AppJson;