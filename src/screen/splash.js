import React, {Component}  from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import { Asset, AppLoading } from 'expo';



export default class splash extends Component {
    static navigationOptions= {header:null};

    state = {
        isReady: false};

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => {
                        this.setState({ isReady: true });
                        setTimeout(() => {

                            this.props.navigation.navigate('Places');
                        }, 5000);
                    }}
                    onError={console.warn}
                />

            );
        }

        return (
            <View >
                <Image style={styles.container} source={require('lucky7app/src/assets/img/logo.png')} />
            </View>
        )

    }
    async _cacheResourcesAsync() {
        const images = [
            require('lucky7app/src/assets/img/logo.png'),

        ];
        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages)
    }

}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height

    }
});

module.exports = splash;
