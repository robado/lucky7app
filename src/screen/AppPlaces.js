import React, {Component} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


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
                    let menocords = [{lat: details.geometry.location.lat, lng: details.geometry.location.lng}]
                    this.props.navigation.navigate('Map', {menopiste: menocords});

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
                        fontFamily:'Roboto',
                        fontSize:17,
                        height:20,



                    },
                    textInputContainer: {
                        width: '100%',
                        backgroundColor: '#fff',
                        borderTopWidth: 10,
                        borderBottomWidth:70,
                        borderTopColor:'#e3e3e3',
                        borderBottomColor:'#e3e3e3',

                    },
                    textInput: {
                        marginLeft: 1,
                        marginRight: 1,
                        height: 50,
                        color: '#666',
                        fontSize: 20,
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                        fontSize:15,


                    },


                }}

                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
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
               // renderRightButton={() => <Text></Text>}

            />
        ) };
}

module.exports =  GooglePlacesInput;




