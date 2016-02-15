function initMap() {
    var map = new google.maps.Map(document.getElementById('map'));
    var input = /** @type {!HTMLInputElement} */(
        document.getElementById('pac-input'));

    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    var place;
    var infowindow = new google.maps.InfoWindow();
    var arrays     = ['ChIJKaGsJKUZ2jERxa8yhKrdPfI','ChIJVx1N8KcZ2jERVo5J9pA7JMI','ChIJay5CK5EZ2jERAPWDcZxzKyo','ChIJ-cuboDAa2jERf6hKqh96UC0','ChIJQyTTUCMY2jERunI_GcAyOug','ChIJKb6RU9Eb2jERhGLOkQoV-AI','ChIJ_yBIIRQX2jERvEDz9aXhFoU','ChIJ9zvsf2YX2jERZrUifS9p9QE','ChIJiSjdY3QY2jERl_jWgSll1_o','ChIJAQBALo4a2jERvRLiVO2P_1U'];
    for(var i = 0 ; i < 10 ; i++){
        var request = {
            placeId: arrays[i] // change this with the place_id
        };

        var service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);
        function callback(place, status) {
            //document.getElementById("Result").innerHTML = place.name; // example
            $('#Result').append("<h3>"+place.name+"</h3>"+"<h3>"+place.formatted_address+"</h3>"+"<button>"+"Add Place"+"</button>");
            console.log(place.name);
        }
    }


    autocomplete.addListener('place_changed', function() {

        infowindow.close();
        console.log("localStorage: "+localStorage.getItem('key'));
        place = autocomplete.getPlace(); // store the place details
        //make a varaiale that will be shared to all pages
        // alert(place.formatted_address);
        //$('#Result').html("<h2>"+input.value+"</h2><br/><h2>"+place.formatted_address+"</h2>");
        //$('#buttonAddToCalendar').css("display","block");
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        //infowindow.open(map, marker);
    });
}/**
 * Created by dbakti7 on 2/14/2016.
 */
