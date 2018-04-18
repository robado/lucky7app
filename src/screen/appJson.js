import React, { Component } from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import AppJsondata from "../components/appJsondata";
import AppWeather from "../components/appWeather";
import AppCamera from "../components/appCamera";
export default class AppJson extends Component {
    constructor(props) {
        super(props);
        this.state = {Id: '',
            coords: this.props.navigation.state.params.location,
            index: Number};
    };
    async componentWillMount(){
        this.setState({
            coords: (this.props.navigation.state.params.location)
        });
        fetch("https://tie.digitraffic.fi/api/v1/metadata/camera-stations")
            .then((response) => response.json())
            .then((responseData) => {
                let cameralength = responseData.features.length;
                for (let i = 0; i < cameralength; i++) {
                    if (this.state.coords.latitude === responseData.features[i].geometry.coordinates[1]
                        && this.state.coords.longitude === responseData.features[i].geometry.coordinates[0]) {
                        let stationid = responseData.features[i].id;
                        console.log("kamera löydetty: ", stationid);
                        this.setState({
                            Id: (stationid),
                            index: i
                        });
                        break
                    }
                }});
        this.forceUpdate();
    }


    render(){
        return(
                <ScrollView>
                    <View>
                        <AppJsondata asemaprop = {this.state.Id} indexprop = {this.state.index}/>
                        <AppWeather/>
                        <AppCamera image = {this.state.Id} />
                    </View>
                </ScrollView>
        );
    }
}
module.exports = AppJson;