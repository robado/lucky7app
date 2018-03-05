import React, { Component } from 'react';
import {
    Dimensions, Text, FlatList, View, Button, AppRegistry, StyleSheet, ListView,
    TouchableOpacity, AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import MarkerCalloutDefault from '../components/MarkerCalloutDefault';
import { TabNavigator } from 'react-navigation';
import reset from "expo/src/Segment";



const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 60.1699;
const LONGITUDE = 24.9384;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = ''; // syötä apikey tänne


export class AppMap extends Component {



    async componentWillMount(){

        const setLat = AsyncStorage.getItem('lattiAsync');
        await setLat;
        const setLong = AsyncStorage.getItem('longiAsync');
        await setLong;
        this.state.coordinates[0].latitude = parseFloat(setLat._55);
        this.state.coordinates[0].longitude = parseFloat(setLong._55);
        this.forceUpdate();

    }

    constructor(props) {

        super(props);
        this.state = {
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
        };

        this.mapView = null;
    }

    /*onMapPress = (e) => {
        this.setState({
            coordinates: [
                ...this.state.coordinates,
                e.nativeEvent.coordinate,
            ],
        });
    };*/
    onMapPress = () => {

    };

    render() {

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
                    ref={c => this.mapView = c}
                    onPress={this.onMapPress}
                    showsUserLocation={true}
                    followsUserLocation={false}
                    showsMyLocationButton={true}
                    customMapStyle={mapStyle}
                >
                    {this.state.coordinates.map((coordinate, index) =>
                        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} >
                            <MarkerCalloutDefault>
                                <TouchableOpacity style={[styles.buttonContainer, styles.bubble]}>
                                    <Text>moi</Text>
                                </TouchableOpacity>
                            </MarkerCalloutDefault>
                        </MapView.Marker>
                    )}
                    <MapViewDirections
                        origin={this.state.coordinates[0]}
                        destination={this.state.coordinates[1]}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
                </MapView>
            </View>
        );
    }

}
mapStyle = [ { "elementType": "geometry", "stylers": [ { "color": "#1d2c4d" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#8ec3b9" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#1a3646" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#64779e" } ] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "color": "#334e87" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#6f9ba5" } ] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#3C7680" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#304a7d" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#2c6675" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#255763" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#b0d5ce" } ] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#5c1d62" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#0e1626" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#4e6d70" } ] } ];
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

});


