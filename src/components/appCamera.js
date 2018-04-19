import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import {AppMap} from "../screen/appMap";

const bottom = "25%";


export default class AppCamera extends Component {

    constructor(props) {
        super(props);
        this.state = {imgId: '',
            cameranId: [],
        };
    };

    componentDidUpdate() {
        console.log("appcameran tietoja:", this.props.image);
        if (this.state.imgId !== this.props.image[0]) {
        this.setState({
            imgId: (this.props.image[0])
        });
            fetch("https://tie.digitraffic.fi/api/v1/data/camera-data/")
                .then((response) => response.json())
                .then((responseData) => {
            let numero = this.props.image[1];
            let camera;
            let cameraId = [];
            for(let i = 0; i < responseData.cameraStations[numero].cameraPresets.length; i++) {
                camera = responseData.cameraStations[numero].cameraPresets[i].id;
                cameraId.push(camera);
            }
                    this.setState({
                        cameranId: (cameraId)
                    });
            console.log("camera-id-array: ", cameraId);
        })}
    }

    render() {

        return <View>
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/'+ this.state.cameranId[0] + '.jpg' + '?' + new Date()}}/>
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/'+ this.state.cameranId[1] + '.jpg' + '?' + new Date()}}/>
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/'+ this.state.cameranId[2] + '.jpg' + '?' + new Date()}}/>
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/'+ this.state.cameranId[3] + '.jpg' + '?' + new Date()}}/>

        </View>;
    }
}
module.exports = AppCamera;


