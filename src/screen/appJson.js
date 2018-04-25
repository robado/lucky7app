import React, { Component } from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import AppJsondata from "../components/appJsondata";
import AppWeather from "../components/appWeather";
import AppCamera from "../components/appCamera";

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

export default class AppJson extends Component {
    constructor(props) {
        super(props);
        this.state = {Id: '',
            coords: this.props.navigation.state.params.location,
            index: Number,
            tarkkaid: '',
            sijainti: '',
            aika: ''};
    };
    async componentWillMount(){
        this.setState({
            coords: (this.props.navigation.state.params.location)
        });
       await fetch("https://tie.digitraffic.fi/api/v1/metadata/camera-stations")
            .then((response) => response.json())
            .then((responseData) => {
                let cameralength = responseData.features.length;
                for (let i = 0; i < cameralength; i++) {
                    if (this.state.coords.latitude === responseData.features[i].geometry.coordinates[1]
                        && this.state.coords.longitude === responseData.features[i].geometry.coordinates[0]) {
                        let stationid = responseData.features[i].id;
                        let tarkkastationid = responseData.features[i].properties.id;
                        console.log("kamera löydetty: ", stationid);
                        this.setState({
                            Id: (stationid),
                            index: i,
                            tarkkaid: tarkkastationid
                        });
                        break
                    }
                }

            });
        this.forceUpdate();
    }


    render(){
        return(
            <View style={{backgroundColor:'#e6f3f2'}}>
                <ScrollView>
                    <View>
                        <Card style={{backgroundColor:'#86999b'}}>
                            <CardContent>
                        <AppJsondata image={[this.state.Id, this.state.index, this.state.tarkkaid, this.state.coords]}/>
                        <AppWeather image={[this.state.Id, this.state.index, this.state.tarkkaid, this.state.coords]}/>
                            </CardContent>
                        </Card>
                        <AppCamera image={[this.state.Id, this.state.index, this.state.tarkkaid, this.state.coords]}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
module.exports = AppJson;