// how to retrieve place id from autocomplete:
// place.place_id;

// how to get place details when we have place_id:
var request = {
    placeId: 'ChIJnWdQKQQZ2jER8tbowGy5nn4' // change this with the place_id
};

var service = new google.maps.places.PlacesService(map);
service.getDetails(request, callback);
function callback(place, status) {
    // the result is in place variable
    // do your process here
    document.getElementById("something").innerHTML = place.name; // example
}