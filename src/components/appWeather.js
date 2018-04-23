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

        return <View style={{justifyContent:'center', alignItems:'center', marginTop:20,}}>
            <Text style={styles.bold}>{`Lämpötila: ` + this.state.temp}</Text>
            <Text style={styles.bold}>{`Tien lämpötila: ` + this.state.roadTemp}</Text>
            <Text style={styles.bold}>{`Tuulen nopeus: ` + this.state.wind}</Text>
            <Image style={{width: 70, height: 70}} source={{uri: 'https://corporate.foreca.com/en/uploads/Symbolset-1/' + this.state.WSymbol + '.png'}}/>
                </View>;
    }
}

const styles = StyleSheet.create({
    bold: {
        color: '#fff',
        fontFamily: 'sans-serif-light',
        fontSize: 20,
        textAlign:'center'
    }
});
module.exports = AppWeather;


