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
    var arrays     = ['ChIJXU9FcvQZ2jERiz8HeaqV70E','ChIJFQYC8YwZ2jERDRaSlDO1Q0k','ChIJscyhaKUZ2jERMoA0Gv3a4iI','ChIJVxDiWQAFBBARlVDWod_TAmE','ChIJk3SwyxQZ2jER3MLPLbxbsOw','ChIJPTigtosZ2jERrLUm0plK7bY','ChIJoeV2WKQZ2jERvqFd1_XG4jg','ChIJqbrxYIwZ2jERV9rTVcsl1Lk','ChIJbxecDwkZ2jER0HC_ulAswUE','ChIJnWdQKQQZ2jER8tbowGy5nn4'];
    for(var i = 0 ; i < 10 ; i++){
        var request = {
            placeId: arrays[i] // change this with the place_id
        };

        var service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);
        function callback(place, status) {
            //document.getElementById("Result").innerHTML = place.name; // example
            
            $('#Result').append('<div><h2 style="font-size:36px;">'+place.name+'</h2><h3">'+place.formatted_address+'</h3></div>'+'<button class="btn">Add place</button>');
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
