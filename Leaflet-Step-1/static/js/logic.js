function createMap(features) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // Create an overlayMaps object to hold the features layer
    var overlayMaps = {
        "Features": features
    };

    // Create the map object with options
    var map = L.map("mapid", {
        center: [37.794417, -117.999210],
        zoom: 5,
        layers: [lightmap, features]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}


function createMarkers(response) {

    // Pull the "features" property off of response.data
    var features = response.features;
    // Initialize an array to hold bike markers
    var Markers = [];

    // Loop through the features array
    for (var index = 0; index < features.length; index++) {
        var feature = features[index];
        console.log(feature.properties.mag)
        // For each feature, create a marker and bind a popup with the feature's name
        var Marker = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{
            color: "green",
            fillColor: "green",
            fillOpacity: 0.75,
            radius: feature.properties.mag*10000
          })
        // .bindPopup("<h3>" + feature.name + "<h3><h3>Capacity: " + feature.capacity + "</h3>");

        // Add the marker to the Markers array
        Markers.push(Marker);
    }
    createMap(L.layerGroup(Markers));

}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
