import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import {AppMap} from "../screen/appMap";

const bottom = "25%";


export default class AppCamera extends Component {

    constructor(props) {
        super(props);
        this.state = {imgId: '',
        };
    };

    componentDidUpdate() {
        console.log("appcameran tietoja:", this.props.image);
        if (this.state.imgId !== this.props.image) {
        this.setState({
            imgId: (this.props.image)
        });}
    }

    render() {

        return <View>
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/'+ 'C0' + this.state.imgId + '00' + '.jpg' + '?' + new Date()}}/>
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/'+ 'C0' + this.state.imgId + '01' + '.jpg' + '?' + new Date()}}/>
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/'+ 'C0' + this.state.imgId + '02' + '.jpg' + '?' + new Date()}}/>
            <Image style={{bottom: bottom, width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain'}} source={{uri: 'https://weathercam.digitraffic.fi/'+ 'C0' + this.state.imgId + '03' + '.jpg' + '?' + new Date()}}/>

        </View>;
    }
}
module.exports = AppCamera;


