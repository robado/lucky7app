import React, { Component } from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';



export default class AppWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {roadTemp: '', temp: '', wind: '', WSymbol: ''};
    };

    componentDidMount() {
        fetch('https://tie.digitraffic.fi/api/v1/data/road-conditions')
            .then((response) => response.json())
            .then((responseData) => {

                let numero = 67;
                this.setState({
                    roadTemp: responseData.weatherData[numero].roadConditions[0].roadTemperature + ('°C'),
                    temp: responseData.weatherData[numero].roadConditions[0].temperature + ('°C'),
                    wind: responseData.weatherData[numero].roadConditions[0].windSpeed + (' m/s'),
                    WSymbol: (responseData.weatherData[numero].roadConditions[0].weatherSymbol )
                });
            });
    }

    render() {

        return <View>
            <Text>
                <Text style={styles.bold}>{`Lämpötila: `}</Text>
                <Text>{this.state.temp}</Text>
            </Text>

            <Text>
                <Text style={styles.bold}>{`Tien lämpötila: `}</Text>
                <Text>{this.state.roadTemp}</Text>
            </Text>

            <Text>
                <Text style={styles.bold}>{`Tuulen nopeus: `}</Text>
                <Text>{this.state.wind}</Text>
            </Text>

            <Image style={{width: 50, height: 50}} source={{uri: 'https://corporate.foreca.com/en/uploads/Symbolset-1/' + this.state.WSymbol + '.png'}}/>
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
module.exports = AppWeather;


