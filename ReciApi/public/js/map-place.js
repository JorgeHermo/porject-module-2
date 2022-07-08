let map

function initialize() {
    renderMap()
    getPlacesFromDB()
}

function renderMap() {
    map = new google.maps.Map(
        document.querySelector('#myMap'),
        { zoom: 4, center: { lat: 40.416775, lng: -3.703339 }, styles: mapStyles.night }
    )
}

function getPlacesFromDB() {

    axios
        .get('/api/maps')
        .then(response => printMarkers(response.data))
        .catch(error => next(new Error(error)))
}

function printMarkers(recipeInfo) {

    recipeInfo.forEach(elm => {
        let position = {
            lat: elm.location.coordinates[0],
            lng: elm.location.coordinates[1]
        }

        let image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

        new google.maps.Marker({ position, map, icon: image, title: elm.title })
    })

    map.setCenter({
        lat: recipeInfo[0].location.coordinates[0],
        lng: recipeInfo[0].location.coordinates[1]
    })
}