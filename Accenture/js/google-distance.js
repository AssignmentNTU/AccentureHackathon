function calcDuration(lat1, lng1, lat2, lng2) {
    var origin = new google.maps.LatLng(lat1, lng1),
        destination = new google.maps.LatLng(lat2, lng2),
        service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false
        },
        callback
    );

    function callback(response, status) {

        if (status == "OK") {
            return response.rows[0].elements[0].duration.text;
        } else {
            alert("Error: " + status);
        }
    }
}

