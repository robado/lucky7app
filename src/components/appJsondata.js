import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';



export default class AppJsondata extends Component {
    constructor(props) {
        super(props);
        this.state = {asema: '', sijainti: '', aika: ''};
    };

    componentDidMount() {
        fetch('https://tie.digitraffic.fi/api/v1/data/camera-data/')
            .then((response) => response.json())
            .then((responseData) => {

                let stationIndex = 6;
                let cameraIndex = 0;
                this.setState({
                    asema: responseData.cameraStations[stationIndex].id,
                    sijainti: responseData.cameraStations[stationIndex].cameraPresets[cameraIndex].presentationName,
                    aika: responseData.cameraStations[stationIndex].cameraPresets[cameraIndex].measuredTime
                });
            });
    }

    render() {

        return <View>
            <Text>
                <Text style={styles.bold}>{`Kameran asema: `}</Text>
                <Text>{this.state.asema}</Text>
            </Text>

            <Text>
                <Text style={styles.bold}>{`Sijainti: `}</Text>
                <Text>{this.state.sijainti}</Text>
            </Text>

            <Text>
                <Text style={styles.bold}>{`Kuvan aika: `}</Text>
                <Text>{this.state.aika}</Text>
            </Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    bold: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14
    }
});
module.exports = AppJsondata;


