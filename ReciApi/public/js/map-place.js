let map
//let geocoder

function initialize() {
    renderMap()
    getPlacesFromDB()
}

function renderMap() {
    map = new google.maps.Map(
        document.querySelector('#myMap'),
        { zoom: 4, center: { lat: 40.416775, lng: -3.703339 }, styles: mapStyles.yellowHumanMade }
    )
}

function getPlacesFromDB() {

    axios
        .get('/api/maps')
        .then(response => printMarkers(response.data))
        .catch(err => console.log((err)))
}

function printMarkers(places) {
    console.log(places)

    places.forEach(elm => {
        let position = {
            lat: elm.location.coordinates[0],
            lng: elm.location.coordinates[1]
        }
        new google.maps.Marker({ position, map })
    })

    map.setCenter({
        lat: places[0].location.coordinates[0],
        lng: places[0].location.coordinates[1]
    })
}