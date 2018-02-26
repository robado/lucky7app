import * as React from 'react';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Dimensions, Text , FlatList, View, Button, AppRegistry, StyleSheet, ListView } from 'react-native';
import AppHeader from './src/components/appHeader';
import AppBody from './src/components/appBody';
import AppFooter from './src/components/appFooter';
import { AppMap } from './src/components/appMap';
import GooglePlacesInput from './src/components/AppPlaces'
import AppJson from "./src/components/appJson"


const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const FirstRoute = () => <View style={[ styles.container ]} ></View>;
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#000000' } ]} ></View>;
const ThirdRoute = () => <View style={[ styles.container, { backgroundColor: '#c80000' } ]} />;

export default class lucky7app extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Home' },
            { key: 'second', title: 'Assignment' },
            { key: 'third', title: 'Person' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderFooter = props => <TabBar {...props} />;




    renderScene = ({ route }) => {
        switch(route.key) {
            case 'first':
                return <AppJson/>;
            case 'second':
                return <AppMap/>;
            case 'third':
                return <AppJson/>;
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
    },
});


AppRegistry.registerComponent('lucky7app',()=> 'lucky7app');
