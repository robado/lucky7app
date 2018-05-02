import React, {Component}  from 'react';
import {Image, Text, View} from 'react-native';
import { Asset, AppLoading } from 'expo';


export default class splash extends Component {

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
            <View>
                <Image source={require('lucky7app/src/assets/img/logo.png')} />
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


module.exports = splash;
