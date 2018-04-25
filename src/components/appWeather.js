import React, { Component } from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';



export default class AppWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {temp: '', wind: '', WSymbol: '', coords: ''};
    };

    componentDidUpdate() {
        if (this.state.coords !== this.props.image[3]) {
            let koordinaatit = this.props.image[3];
            this.setState({coords: koordinaatit});
            let lat = koordinaatit.latitude;
            let lng = koordinaatit.longitude;
            fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=066fec7e455e1609f09e5a74e50cae15')
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({
                        temp: Math.round(responseData.main.temp-273) + '°C',
                        wind: responseData.wind.speed + (' m/s'),
                        WSymbol: responseData.weather[0].icon
                    });
                });
        }
    }

    render() {

        return <View style={{justifyContent:'center', alignItems:'center', marginTop:20,}}>
            <Text style={styles.bold}>{`Lämpötila: ` + this.state.temp}</Text>
            <Text style={styles.bold}>{`Tuulen nopeus: ` + this.state.wind}</Text>
            <Image style={{width: 70, height: 70}} source={{uri: 'http://openweathermap.org/img/w/'+ this.state.WSymbol + '.png'}}/>
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


