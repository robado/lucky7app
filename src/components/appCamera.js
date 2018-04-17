import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import {AppMap} from "../screen/appMap";

const bottom = "25%";


export default class AppCamera extends Component {

    constructor(props) {
        super(props);
        this.state = {imgId: '',
        coords: this.props.location};
    };

    componentDidMount() {
        //let lng = this.props.navigation.state.params.coordinate;
        console.log("lng ", this.state.lng);
        let stationid = Number;
        fetch("https://tie.digitraffic.fi/api/v1/metadata/camera-stations")
            .then((response) => response.json())
            .then((responseData) => {
               if (this.state.coords.latitude === responseData.features.geometry.latitude
                   && this.state.coords.longitude === responseData.features.geometry.longitude ){
                   stationid = responseData.features.id;
               }
            });
        console.log("stationid: ",stationid);
        fetch('https://tie.digitraffic.fi/api/v1/data/camera-data/')
            .then((response) => response.json())
            .then((responseData) => {

                let numero = 6;
                let camera = 0;
                this.setState({
                    imgId: (responseData.cameraStations[numero].cameraPresets[camera].id)
                });
            });
    }

    render() {

        return <View>
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/' + this.state.imgId + '.jpg' + '?' + new Date()}}/>
        </View>;
    }
}
module.exports = AppCamera;


