function getCoordinates() {

    return fetch('https://tie.digitraffic.fi/api/v1/metadata/camera-stations')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.features;
        })
        .catch((error) => {
            console.error(error);
        });
}

//from where you are calling getMovies
getCoordinates()
    .then(response => {
        var data = response.find((roadStationId) =>
            geometry.coordinates[0].valueOf('25.350988003318495') && geometry.coordinates[1].valueOf('60.67159928875896')> -1
        )
        console.log(data)
        if(data) {
            console.log('found');
        }
    })

module.export = getCoordinates();