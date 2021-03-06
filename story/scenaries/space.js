var tools = require("../tools");

var space = module.exports = {};

space.init_message = "A long time ago, in a galaxy far, far away...";

space.message = "Space";

space.destinations = [];

space.createDestinations = function(n) {
    var fs   = require("fs");
    var data = fs.readFileSync(__dirname+"/star_trek_places.csv");
    var places = data.toString().replace(/\n/g, "").split(",");
    var added = {};
    function getRandomPlace() {
        var place = places[Math.floor(Math.random() * places.length)];
        while (added[place]) {
            place = places[Math.floor(Math.random() * places.length)];
        }
        added[place] = true;
        return place;
    }
    for (var i = 0; i < n; i++) {
        var has_planet = Math.random() > 0.5;
        space.destinations[i] = has_planet ? getRandomPlace() : has_planet;
    }
};

space.createDestinations(100);

space.RandomDestination = function() {
    return Math.floor(Math.random() * space.destinations.length);
};

space.existsWorldAt = function(destination) {
    return this.destinations[destination];
};

space.DestinationError = function(d) {
    return new Error("Destination "+d+" doesn't have a planet, Captain.");
};

var ports = {};

space.Port = function(name) {
    var port     = {};
    port.id      = tools.getId(name, ports);
    port.message = space.message + " Port";
    port.course  = 0;
    port.ships   = {};
    port.say     = tools.say.bind(port);

    port.host = function(ship) {
        port.say("hosted", ship.message, ship.id);
        port.ships[ship.id] = ship;
    };

    port.isReady = function(id) {
        var ship   = port.ships[id];
        var answer = ship.ready ? "yes!" : "no.";
        port.say("is", ship.message, id, "ready?", answer);
        return port.ships[id].ready;
    };

    port.setCourseTo = function(course) {
        course = space.existsWorldAt(course) || course;
        port.say("Mr. Sulu, set course to", course);
        if (typeof course === "number") {
            throw space.DestinationError(course);
        }
        port.course = course;
    };

    port.launch = function(id) {
        var ship = port.ships[id];
        port.say("launching", ship.message, ship.id, "to", port.course);
    };

    return port;
};

var ships = {};

space.Ship = function(name) {
    var ship     = {};
    ship.id      = tools.getId(name, ships);
    ship.message = space.message + " Ship";
    ship.ready   = false;
    ship.say     = tools.say.bind(ship);

    ship.setReady = function() {
        ship.say("I'm ready!");
        this.ready = true;
    };

    return ship;
};

space.Ship.message =  "Ship";
