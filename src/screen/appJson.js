import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

export default class AppJson extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentWillMount(){
        this.fetchData();
    }
    //hakee tms dataa.
    fetchData = async () => {
        const response =  await fetch("https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=false");
        const json = await response.json();
        this.setState({data: json.tmsStations});
    };
    render(){
        return(
            <View>
                <FlatList  data={this.state.data}
                           keyExtractor={(x, i) => i}
                           renderItem={({ item })=>
                               <Text>
                                   {`id:${item.id} tmsNumber:${item.tmsNumber} sensorValue:${item.sensorValues[0].id}`}
                               </Text>}

                />

            </View>
        );
    }
}
module.exports = AppJson;