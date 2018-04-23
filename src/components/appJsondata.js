import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';



export default class AppJsondata extends Component {
    constructor(props) {
        super(props);
        this.state = {asema: '', sijainti: '', aika: ''};
    };

    componentDidUpdate() {
        if (this.state.asema !== this.props.asema) {
        fetch('https://tie.digitraffic.fi/api/v1/data/camera-data/')
            .then((response) => response.json())
            .then((responseData) => {

                let stationIndex = this.props.image[1];
                let cameraIndex = 0;
                    this.setState({
                        asema: this.props.image[0],
                        sijainti: this.props.image[3],
                        aika: this.props.image[4]
                    });

            });}
    }

    render() {

        return <View>

                <Text style={styles.bold}>{`Kameran asema: ` + this.state.asema}</Text>


        </View>;
    }
}

const styles = StyleSheet.create({
    bold: {
        color: '#fff',
        fontFamily: 'sans-serif-light',
        fontSize: 35,
        textAlign:'center',
        //fontWeight:'bold',
        marginTop:10,

    }
});
module.exports = AppJsondata;


