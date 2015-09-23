/*
    App specific methods, extends map functions
*/
var App = (function(Maps) {

    // locally scoped Object
    var publicFunction = {};

    // sorts array in numerical ascending order
    var _sortArray = function(locations) {
        locations.sort(
            function(a, b){ return a.distance-b.distance }
        );

        return locations;
    };

    var _outputResults = function(locations) {
        var $el = $('.js-destinations');
        var $elNone = $('.js-noresults');

        // clear current results
        $el.html('');
        $elNone.html('');

        // write to DOM
        locations.forEach(function(location) {
            if(location.distance != 0) {
                $el.append(
                    '<li>(' + location.distance + ' mi) - ' +
                    location.destination + '</li>'
                );
            } else {
                $elNone.append(
                    '<li>' + location.destination + '</li>'
                );
            }
        });
    };

    // public methods that are available outside of function
    publicFunction.init = function(origin, destinations) {
        var results;

        Maps.getDistance(origin, destinations, function(results) {
            // sort array
            results = _sortArray(results);

            // output result
            _outputResults(results);
        });
    };

    return publicFunction;

})(Maps || {});


// ready go!
$(document).ready(function() {

    // declare default values
    var origin = "510 Victoria, Venice, CA";
    var destinations = [
            "13000 S Dakota 244, Keystone, SD 57751",
            "1600 Pennsylvania Ave NW, Washington, DC 20500",
            "Golden Gate Bridge, San Francisco, CA 94129",
            "Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom",
            "Great Wall of China",
            "Hollywood Sign, Los Angeles, CA"
        ];

    // start app
    init = (function() {
        App.init(origin, destinations);
    });

    // add new address
    $('.submit').click(function() {
        var $el = $('.js-add');

        // get input value
        var destination = $el.val();

        // add to array
        destinations.push(destination);

        // do work
        App.init(origin, destinations);

        // clear input
        $el.val('');
    });

});