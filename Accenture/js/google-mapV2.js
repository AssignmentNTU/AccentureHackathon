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


    $('#buttonAddToCalendar').click(function(){
        console.log("Add to calendar has been saved");
        //local storage
        var timeChoosen =  localStorage.getItem('key');
        var Schedule = Parse.Object.extend("Schedule");
        var sched = new Schedule();
        Parse.initialize("BDGyl4cvobyTGJ2pqSUMjMpol0sRfF6zuSAy8UpT", "QlSRwUtDnZsX1PoEEQqId4sCaYLSuBClzYCMwRL8");
        sched.set("Time",timeChoosen);
        sched.set("DataString",input.value);
        sched.save(null, {
            success: function(object) {
                // Execute any logic that should take place after the object is saved.
                //alert('New object created with objectId: ' + object.id);
                //alert('No Event has ever created');
                alert(input.value+" success");
            },
            error: function(gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    });

    autocomplete.addListener('place_changed', function() {

        infowindow.close();
        console.log("localStorage: "+localStorage.getItem('key'));
        place = autocomplete.getPlace(); // store the place details
        //make a varaiale that will be shared to all pages
        // alert(place.formatted_address);
        $('#Result').html("<h2>"+input.value+"</h2><br/><h2>"+place.formatted_address+"</h2>");
        $('#buttonAddToCalendar').css("display","block");
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
