import React, { Component } from 'react';
import {
    Dimensions, Text, FlatList, View, Button, AppRegistry, StyleSheet, ListView,
    TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import MarkerCalloutDefault from '../components/MarkerCalloutDefault';
import { Location} from 'expo';
import geolib from "geolib";
import { NavigationActions } from 'react-navigation';
import appJson from "./appJson";
import appCamera from "../components/appCamera";
import _ from "lodash";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 60.1699;
const LONGITUDE = 24.9384;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAk6tQcvv2Wy0uleMAd34PWBbBcnkirJBI'; // syötä apikey tänne


export class AppMap extends Component {

    async componentWillMount(){
                            //Matkan pisteiden asettaminen
        //hakee aync storagesta latituden joka on setattu AppPlaces sivulla
        const setLat = AsyncStorage.getItem('lattiAsync');
        await setLat;
        //hakee async storagesta longituden
        const setLong = AsyncStorage.getItem('longiAsync');
        await setLong;
        //laittaa haetut tiedot this.stateen ensimmäisen coordinates arrayn objektiin joka on kohde piste
        this.state.coordinates[0].latitude = parseFloat(setLat._55);
        this.state.coordinates[0].longitude = parseFloat(setLong._55);
        //hakee react nativen omalla geolocation funktiolla current positionin
        let location = await Location.getCurrentPositionAsync({});
        //cloonataan alkuperäinen coordinates arraylist statesta ja kaikki sen sisältämät arvot
        let original = [...this.state.coordinates];
        //valitaan arraylistin cloonista toinen coordinates arrayn objekti, joka on lähtöpiste
        original[1] = {latitude: JSON.parse(location.coords.latitude),
                        longitude: JSON.parse(location.coords.longitude)};
        //laitetaan muutettu kopio coordinates arraylististä alkuperäisen tilalle
        this.setState({coordinates: original});

                            // asemien kordinaattien asettaminen
        //cloonataan waypoints ja otetaan pituus. Poisti yhden bugin
        let placeholderwaypoints = await [...this.state.waypoints];
        let waypoints = await placeholderwaypoints.length;
        let chunkedway = _.chunk(placeholderwaypoints, [size=(waypoints)/20]);
        let boundcameras = [];
        console.log("chunk: ", chunkedway[0].length);
        await fetch('https://tie.digitraffic.fi/api/v1/metadata/camera-stations')
            .then((response) => response.json())
                .then((responseData) => {
                    //asetetaan kameroiden arraylistin pituus muuttujaksi
                    let cameralength = responseData.features.length;
                    //kloonataan original2 array lista
                    let original2 = [...this.state.cameras];
                    //asetetaan arraylist, joka tulee sisältämään kaikki tiellä olevat kamerat
                    let filtered = [];
                    //asetetaan latitude ja longitude arraylistaat waypoint-arraylistan objektien arvoista
                    for (let x=0; x < chunkedway.length; x++) {
                        let latitudes = chunkedway[x].map((point) => point.latitude);
                        let longitudes = chunkedway[x].map((point) => point.longitude);

                        for (let j = 0; j < cameralength; j++) {
                            original2[j] = {
                                latitude: responseData.features[j].geometry.coordinates[1],
                                longitude: responseData.features[j].geometry.coordinates[0]
                            };
                            if (original2[j].latitude > _.min(latitudes) && original2[j].latitude < _.max(latitudes) && original2[j].longitude > _.min(longitudes) && original2[j].longitude < _.max(longitudes)) {
                                boundcameras.push({latitude: original2[j].latitude, longitude: original2[j].longitude});
                            }
                        }
                        //asetetaan boundcameras, minkä tarkoituksena on rajata vertailualgoritmin kokoa
                        //for-lause, joka katsoo, onko kamera tiettyjen koordinaattien muodostamassa neliössä
                        //jos on, niin se lisää koordinaatin bouncameras -arraylistaan
                        //jos ei, ei tee mitään
                        for (let j = 0; j < cameralength; j++) {
                            original2[j] = {
                                latitude: responseData.features[j].geometry.coordinates[1],
                                longitude: responseData.features[j].geometry.coordinates[0]
                            };
                            if (original2[j].latitude > _.min(latitudes) && original2[j].latitude < _.max(latitudes) && original2[j].longitude > _.min(longitudes) && original2[j].longitude < _.max(longitudes)) {
                                boundcameras.push({latitude: original2[j].latitude, longitude: original2[j].longitude});
                            }
                        }
                    }
                    //for-lause, jossa verrataan kameroita piirrettyyn reittiin. Käytetään boundcameras-arraylistaa, joka
                    //setattiin aikaisemmassa algoritmissa aikavaativuuksien vuoksi
                    for (let i = 0; i < boundcameras.length; i++) {
                        for (let x = 0; x < waypoints; x++){
                            let geodistance = geolib.getDistance(
                                {latitude: boundcameras[i].latitude, longitude: boundcameras[i].longitude},
                                {latitude: this.state.waypoints[x].latitude, longitude: this.state.waypoints[x].longitude}
                            );
                            //katsoo onko kamera tietyn matkan päässä waypointista
                            //jos kamera on, se lisää ne filtered listaaan
                            //jos ei ole, se ei tee mitään
                            if (geodistance < 1000){
                                filtered.push({ latitude: boundcameras[i].latitude, longitude: boundcameras[i].longitude});
                                break
                            }
                        }
                    this.setState({cameras: filtered});


                }
            });

        this.forceUpdate();
        this.setState({animating: false});

    }


    constructor(props) {

        super(props);
        this.state = {
            animating: true,
            coordinates: [
                {
                    latitude: 61.2345,
                    longitude: 26.3425,
                },
                {
                    latitude:  60.2933,
                    longitude: 25.040,
                },

            ],
            cameras: [
                {
                    latitude:  25.040,
                    longitude: 60.2933,
                },

            ],

            waypoints: [
                {
                    latitude:  Number,
                    longitude: Number,
                },
            ],
        };

    }

    /*onMapPress = (e) => {
        this.setState({
            coordinates: [
                ...this.state.coordinates,
                e.nativeEvent.coordinate,
            ],
        });
    };
    onMapPress = () => {

    };
*/
    render() {

        let waypoints = this.state.waypoints.length;
        return (
            <View style={[styles.container]}>
                <MapView
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    style={ styles.map}
                    onPress={this.onMapPress}
                    showsUserLocation={true}
                    followsUserLocation={false}
                    showsMyLocationButton={true}
                    customMapStyle={mapStyle}
                >
                    {this.state.coordinates.map((coordinate, index) =>
                        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} >

                        </MapView.Marker>
                    )}
                    {this.state.cameras.map((coordinate, index) =>
                        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate}
                                        image={require('../assets/img/camera2.bmp')}
                                        opacity = {0.5}
                                        onPress={() =>  {
                                            this.props.navigation.navigate("Json", {location: coordinate});

                                        }}>
                        </MapView.Marker>
                    )}
                    <MapViewDirections
                        origin={this.state.coordinates[1]}
                        destination={this.state.coordinates[0]}
                        apikey={"AIzaSyBa1PSCHdZ74voA-BJTF1GGtRvNg_GuaLs"}
                        strokeWidth={4}
                        strokeColor="hotpink"
                        onReady={(params) => {
                            for (let i = 0; i < params.coordinates.length; i++) {
                                let original3 = [...this.state.waypoints];
                                original3[i] = { latitude: params.coordinates[i].latitude,
                                    longitude: params.coordinates[i].longitude};
                                this.setState({waypoints: original3});
                            }
                        }}
                    />
                </MapView>
                <ActivityIndicator animating={this.state.animating} size="large" color="#0000ff" style={{justifyContent: 'center', paddingBottom: 300,}} />
            </View>
        );


    }

}

mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": -10
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": -5
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": 100
            }
        ]
    },
    {
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#8481fe"
            },
            {
                "saturation": -75
            },
            {
                "lightness": -10
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": -35
            },
            {
                "lightness": -20
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": -90
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": -55
            },
            {
                "lightness": 20
            }
        ]
    }
];

const styles = StyleSheet.create({
    customView: {
        width: 140,
        height: 100,
        flex: 1,
    },
    plainView: {
        width: 60,
        flex:1,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,


    },
   map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },

    latlng: {
        width: 200,
        alignItems: 'stretch',
        flex:1,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 1,
        paddingVertical: 1,
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 1,
        paddingVertical: 1,
    },
    buttonContainer2: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },

});


