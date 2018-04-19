import * as React from 'react';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Dimensions, Text , FlatList, View, Button, AppRegistry, StyleSheet, ListView, Image } from 'react-native';
import {AppMap} from './src/screen/appMap';
import GooglePlacesInput from './src/screen/AppPlaces';
import AppJson from "./src/screen/appJson";
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import {TabNavigator, NavigationActions, StackNavigator} from 'react-navigation';

import Icon from "expo/src/Icon";




class Json extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'Json',

            icon: () => (<Icon size={24} color="white" name="json" />)
        }
    };

    render() {   }
}

class Places extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'Places',
            icon: () => (<Icon size={24} color="white" name="places" />)
        }
    };

    render() { }
}

class Map extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'Map',
            icon: () => (<Icon size={24} color="white" name="map" />)
        }
    };

    render() { }
}




const Navigation = StackNavigator({



        Places: { screen: GooglePlacesInput },
        Map: { screen: AppMap },
        Json: { screen: AppJson },
    }
    ,
    {navigationOptions:{
            headerStyle:{backgroundColor:'#109482', marginTop:24,  },
            //HeaderTitle:<Image size={24} source={require('../lucky7app/src/assets/img/home.png')} />
            /*     title: <Image source={require('../lucky7app/src/assets/img/home.png')}/>
             })*/
        }}
);
export default class lucky7app extends React.Component{
    render() {


        return (
            <Navigation/>

        )
    }
}



AppRegistry.registerComponent('lucky7app',()=> 'lucky7app');
