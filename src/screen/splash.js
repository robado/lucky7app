import React, { Component } from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import { Asset, AppLoading } from 'expo';
/*
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import lucky7app from "../../App";

export default class splash extends Component {

    componentWillMount() {
        {
            setTimeout(function () {
                this.props.navigation.navigate('Places');
            }, 2000);
        }
    }
    render() {
        // getting width according to device screen size for fitting loading image on screen
        let width = Dimensions
            .get('window')
            .width;

        return (
            <TouchableOpacity style={styles.indexContainer}>
                <Image
                    source={require('.././img/iconi.png')}
                    style={[
                        styles.base, {
                            resizeMode: 'cover'
                        }, {
                            alignSelf: 'center'
                        }, {
                            width: width
                        }, {
                            height: 200
                        }
                    ]} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    indexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcometxt: {
        textAlign: 'center',
        fontSize: 20,
        color: '#10598F'
    }
});
AppRegistry.registerComponent('splash', () => lucky7app);
*/

export default class splash extends Component {

    state = {
        isReady: false
    };

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => {this.setState({ isReady: true });
                        this.props.navigation.navigate('Places')
                    }}
                    onError={console.warn}
                />
            );
        }


/*
           setTimeout(function() {
               this.props.navigation.navigate('Places')
           }, 2000);
*/

        return (
            <View style={styles.container}>
                <Text>LOADING</Text>
                <Image source={require('lucky7app/src/assets/img/iconi.png')} />
            </View>
        )


    }
    async _cacheResourcesAsync() {
        const images = [
            require('lucky7app/src/assets/img/iconi.png'),

        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages)

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#890223',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:'sans-serif-light',
        color:'#000',

    },
});


module.exports = splash;
