import React, {Component} from 'react';
import {View, Image, Text, AsyncStorage} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { BackHandler } from 'react-native';
import Permissions from "expo";
import {AppMap} from "./appMap";
//const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
//const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};



export class GooglePlacesInput extends Component {

   async componentDidMount() {
       const permissionStatus = Expo.Permissions.getAsync(Expo.Permissions.LOCATION);
       if (permissionStatus !== 'granted') {
           alert(
               'Laita GPS päälle',
           );
   }

    }
    render(){

        return (
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='true'    // true/false/undefined
                fetchDetails={true}
                renderDescription={(row) => row.description} // custom description render
                onPress={(data, details = null) =>  {   // 'details' is provided when fetchDetails = true
                    AsyncStorage.setItem('lattiAsync', details.geometry.location.lat.toString());
                    AsyncStorage.setItem('longiAsync', details.geometry.location.lng.toString());
                    this.props.navigation.navigate('Map');

                }}
                getDefaultValue={() => {
                    return ''; // text input default value
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: ' AIzaSyDY6KpN2rzNeL-86blWwMeG0plkZlWVoi0 ',
                    language: 'fi', // language of the results
                    types: '(cities)' // default: 'geocode'
                }}
                styles={{
                    description: {
                        fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb'
                    }
                }}

                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'

                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                //  predefinedPlaces={[homePlace, workPlace]}

                debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderRightButton={() => <Text></Text>}

            />


        ) };


}

module.exports =  GooglePlacesInput;




