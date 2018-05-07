import React, { Component } from 'react';
import {View, Image, Dimensions, ScrollView} from 'react-native';
import {AppMap} from "../screen/appMap";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

const bottom = "25%";


export default class AppCamera extends Component {

    constructor(props) {
        super(props);
        this.state = {imgId: '',
            kortit: [],
            cameranId: [],
            sijainti:[
                {
                    suunta: 'Ladataan',
                },
                {
                    suunta: 'Tienpinta',
                },
                {
                    suunta: 'Tienpinta',
                },
                {
                    suunta: 'Tienpinta',
                },
                {
                    suunta: 'Tienpinta',
                },
                {
                    suunta: 'Tienpinta',
                },
            ],
            aika:'',
        };
    };
    //ladataan kameratietoa ja suuntatietoa
    async componentDidUpdate() {
        //varmistetaan, että ei jäädä infinite looppiin
        if (this.state.imgId !== this.props.image[0]) {
            this.setState({
                imgId: (this.props.image[0])
            });
            //hateaan kameran dataa
            await fetch("https://tie.digitraffic.fi/api/v1/data/camera-data/")
                .then((response) => response.json())
                .then((responseData) => {
                    //setataan kameran indexnumero ja arraylist kameroiden hakuun
                    let numero = this.props.image[1];
                    let camera;
                    let cameraId = [];
                    let sijaintifiltered = [...this.state.sijainti];
                    // looppi joka katsoo kaikki kameran idt ja mappaa ne oikeisiin suuntatietoihin
                    for(let i = 0; i < responseData.cameraStations[numero].cameraPresets.length; i++) {
                        camera = responseData.cameraStations[numero].cameraPresets[i].id;
                        cameraId.push(camera);
                        let check =  responseData.cameraStations[numero].cameraPresets[i].id;
                        //tarkistaa 10 eri id mahdollisuutta ja jos täsmää, niin lisää arraylistiin
                        // sen jälkeen id laitetaan this.stateen ja idtä käytetään suunnan hakemiseen
                        console.log("vertaus: ",check);
                        for (let x = 0; x < 9; x++) {
                            console.log("vertaus algoritmi:", this.props.image[2] + "0" + x);
                            if (check === this.props.image[2] + "0" + x ) {
                                console.log("löytyi numerolla", i );
                                sijaintifiltered[i] = {suunta: responseData.cameraStations[numero].cameraPresets[i].presentationName};
                                console.log("camera staten suunnat: ", this.state.sijainti);
                                this.setState({
                                    sijainti: sijaintifiltered,
                                    aika: responseData.cameraStations[numero].cameraPresets[i].measuredTime
                                });
                            }
                        }
                    }
                    this.setState({
                        cameranId: (cameraId),
                        loading: false
                    });

                }).then(() =>{
                    let table = [];
                    console.log("cameraid pituus: ", this.state.cameranId.length);
                    for (let i = 0; i !== this.state.cameranId.length; i++){
                        table[i] = (<Card
                            key={i}>
                            <CardImage
                                source={{uri: 'https://weathercam.digitraffic.fi/'+ this.state.cameranId[i] + '.jpg' + '?' + new Date()}}
                                title={this.state.sijainti[i].suunta}
                            />
                            <CardTitle
                                subtitle={"Kameran ID: " + this.state.cameranId[i] + "Aika: " +  this.state.aika}
                            />
                        </Card> )

                    }
                    this.setState({kortit: table});
                });

        }
    }



    render() {
        return <View>
            <ScrollView>
                {this.state.kortit}
            </ScrollView>
        </View>;
    }
}
module.exports = AppCamera;


