import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';


const bottom = "25%";
export default class AppCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {imgId: ''};
    };

    componentDidMount() {
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
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/' + this.state.imgId + '.jpg'}}/>
        </View>;
    }
}
module.exports = AppCamera;


