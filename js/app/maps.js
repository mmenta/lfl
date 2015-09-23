/*
    I decoupled the map functions from the specific app functions
    for reusability. I wrapped this as an anonymous function in order to
    provide better encapsulation.
*/
var Maps = (function () {

    // locally scoped Object
    var publicFunction = {};

    // parse result of google call, returns array of locations/distances
    var _parseResult = function (response, status, callback) {
        var locations = [],
            origins,
            destinations;

        if (status == google.maps.DistanceMatrixStatus.OK) {
            origins = response.originAddresses;
            destinations = response.destinationAddresses;

            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;

                for (var j = 0; j < results.length; j++) {
                    var element = results[j],
                        from = origins[i],
                        to = destinations[j],
                        distance,
                        duration;

                    if(element.status == 'OK') {
                        distance = parseFloat(element.distance.text.replace(/,/g, ''));
                        duration = element.duration.text;
                    } else {
                        distance = 0;
                    }

                    locations.push({
                        destination: to,
                        distance: distance
                    });
                }
            }
            callback(locations);
        }
    };

    // public methods that are available outside of function
    publicFunction.getDistance = function (origin, destinations, callback) {
        var service = new google.maps.DistanceMatrixService();

        // make call, result parsed in callback
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: destinations,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }, function(response, status) {
            _parseResult(response, status, callback);
        });
    };

    return publicFunction;

})();