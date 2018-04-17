import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';


var x;
const window = Dimensions.get('window');

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
                var camera;
                var cameraId = [];
                for(let i = 0; i < responseData.cameraStations[numero].cameraPresets.length; i++) {
                    camera = responseData.cameraStations[numero].cameraPresets[i].id;
                    cameraId.push(camera);
                }

                //console.log(cameraId);

                for (x = 0; x < cameraId.length - 1; x++){

                }
                console.log(x);


                this.setState({
                    imgId: (cameraId)
                });


            });

    }


    render() {

        return <View style={{flex: 1}}>
            <Image style={{width: window.width, height: 300}}
                   source={{uri: 'https://weathercam.digitraffic.fi/' + this.state.imgId[x] + '.jpg' + '?' + new Date()}}/>


        </View>;
    }



}
module.exports = AppCamera;


