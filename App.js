import * as React from 'react';
import {  AppRegistry, } from 'react-native';
import {AppMap} from './src/screen/appMap';
import GooglePlacesInput from './src/screen/AppPlaces';
import AppJson from "./src/screen/appJson";
import splash from "./src/screen/splash";
import { StackNavigator} from 'react-navigation';

import SplashScreen from 'react-native-splash-screen';


class Json extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'Json',

        }
    };

    render() {   }
}

class Places extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'Places',
        }
    };

    render() { }
}

class Map extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'Map',
        }
    };

    render() { }
}




const Navigation = StackNavigator({
       splash: { screen: splash},
        Places: { screen: GooglePlacesInput,
            navigationOptions:{
                headerStyle:{backgroundColor:'#3a606a', justifyContent: 'center', alignItems:'center'},
                title: 'Hae Määränpääsi',
                headerTitleStyle: {alignSelf: 'center', color:'#fff', justifyContent: 'center', alignItems:'center'},
            }
        },
        Map: { screen: AppMap,
            navigationOptions:{
                headerStyle:{backgroundColor:'#3a606a', justifyContent: 'center', alignItems:'center' },
                title: 'Valitse Kamera',
                headerTitleStyle: {alignSelf: 'center', color:'#fff', justifyContent: 'center', alignItems:'center'},
            }

        },
        Json: { screen: AppJson,
            navigationOptions:{
                headerStyle:{backgroundColor:'#3a606a', justifyContent: 'center', alignItems:'center'},
                title: 'Kamerat',
                headerTitleStyle: {alignSelf: 'center', color:'#fff', justifyContent: 'center', alignItems:'center'},
            }},
    }


);
export default class lucky7app extends React.Component {



   render(){
    return(
        <Navigation/>
    )
   }
}




AppRegistry.registerComponent('lucky7app',()=> 'lucky7app');
