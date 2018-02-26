import * as React from 'react';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Dimensions, Text , FlatList, View, Button, AppRegistry, StyleSheet, ListView } from 'react-native';
import {AppMap} from './src/components/appMap';
import GooglePlacesInput from './src/components/AppPlaces';
import AppJson from "./src/components/appJson";



const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

export default class lucky7app extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'FirstRoute', title: 'json' },
            { key: 'SecondRoute', title: 'map' },
            { key: 'ThirdRoute', title: 'places' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderFooter = props => <TabBar {...props} />;



    renderScene = ({ route }) => {
        switch(route.key) {
            case 'FirstRoute':
                return <View style={[ styles.container, { backgroundColor: '#fff' } ]}><AppJson/></View>;
            case 'SecondRoute':
               // return <View style={[ styles.container, { backgroundColor: '#000' } ]}><AppMap/></View>;
            case 'ThirdRoute':
                return <View style={[ styles.container, { backgroundColor: '#401692'} ]} ><GooglePlacesInput/></View>;
            default:
                return null;
        }
    }

    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this.renderScene}
                renderFooter={this._renderFooter}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}

            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:20,
    },
});


AppRegistry.registerComponent('lucky7app',()=> 'lucky7app');
