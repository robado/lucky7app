import React, { Component } from 'react';
import {View, Image, Dimensions, ScrollView} from 'react-native';
import {AppMap} from "../screen/appMap";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

const bottom = "25%";


export default class AppCamera extends Component {

    constructor(props) {
        super(props);
        this.state = {imgId: '',
            cameranId: [],
            sijainti:[
                {
                    suunta: 'Ladataan',
                },
                {
                    suunta: 'Ladataan',
                },
                {
                    suunta: 'Ladataan',
                },
                {
                    suunta: 'Ladataan',
                },
            ],
            aika:'',
        };
    };

    async componentDidUpdate() {
        if (this.state.imgId !== this.props.image[0]) {
        this.setState({
            imgId: (this.props.image[0])
        });
            await fetch("https://tie.digitraffic.fi/api/v1/data/camera-data/")
                .then((response) => response.json())
                .then((responseData) => {
            let numero = this.props.image[1];
            let camera;
            let cameraId = [];
            let sijaintifiltered = [...this.state.sijainti];
            for(let i = 0; i < responseData.cameraStations[numero].cameraPresets.length; i++) {
                camera = responseData.cameraStations[numero].cameraPresets[i].id;
                cameraId.push(camera);

                let check =  responseData.cameraStations[numero].cameraPresets[i].id;
                console.log("vertaus: ",check);
                for (let x = 0; x < 10; x++) {
                    console.log("vertaus algoritmi:", this.props.image[2] + "0" + x);
                    if (check === this.props.image[2] + "0" + x ) {
                        console.log("löytyi numerolla", i );
                        sijaintifiltered[i] = {suunta: responseData.cameraStations[numero].cameraPresets[i].presentationName};
                        console.log("camera staten suunnat: ", this.state.sijainti);

                        this.setState({
                            sijainti: sijaintifiltered,
                            aika: responseData.cameraStations[numero].cameraPresets[i].measuredTime
                        });
                        break
                    }
                }
            }



                    this.setState({
                        cameranId: (cameraId)
                    });})}
    }

    render() {

        return <View>
            <ScrollView>

                <Card>
                    <CardImage
                        source={{uri: 'https://weathercam.digitraffic.fi/'+ this.state.cameranId[0] + '.jpg' + '?' + new Date()}}
                        title={this.state.sijainti[0].suunta}
                    />
                    <CardTitle
                        subtitle={"Kameran ID: " + this.state.cameranId[0] + "Aika: " +  this.state.aika}
                    />
                </Card>
                <Card>
                    <CardImage
                        source={{uri: 'https://weathercam.digitraffic.fi/'+ this.state.cameranId[1] + '.jpg' + '?' + new Date()}}
                        title="Suunta 2"
                    />
                    <CardTitle
                        subtitle={"Kameran ID: " + this.state.cameranId[1] + "Aika: " +  this.state.aika}
                    />
                </Card>
                <Card>
                    <CardImage
                        source={{uri: 'https://weathercam.digitraffic.fi/'+ this.state.cameranId[2] + '.jpg' + '?' + new Date()}}
                        title="Suunta 3"
                    />
                    <CardTitle
                        subtitle={"Kameran ID: " + this.state.cameranId[2] + "Aika: " +  this.state.aika}
                    />
                </Card>
                <Card>
                    <CardImage
                        source={{uri: 'https://weathercam.digitraffic.fi/'+ this.state.cameranId[3] + '.jpg' + '?' + new Date()}}
                        title="Suunta 4"
                    />
                    <CardTitle
                        subtitle={"Kameran ID: " + this.state.cameranId[3] + "Aika: " +  this.state.aika}
                    />
                </Card>


            </ScrollView>
        </View>;
    }
}
module.exports = AppCamera;


