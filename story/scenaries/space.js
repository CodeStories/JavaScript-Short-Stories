var say = function() {
    var args = Array.prototype.slice.call(arguments);
    return process.stdout.write([this.message, this.id, "said:"].concat(args).join(" ")+"\n");
};

var space = module.exports = {};

space.init_message = "A long time ago, in a galaxy far, far away...";

space.message = "Space";

space.destinations = [];

space.createDestinations = function(n) {
    for (var i = 0; i < n; i++) {
        this.destinations[i] = Math.random() > 0.5;
    }
};

space.createDestinations(100);

space.RandomDestination = function() {
    return Math.floor(Math.random() * this.destinations.length);
};

space.existsWoldAt = function(destination) {
    return this.destinations[destination];
};

space.DestinationError = function(d) {
    return new Error("Destination "+d+" doesn't have a planet, Captain.");
};

var port_ids = 0;

space.Port = function() {
    var port     = {};
    port.id      = port_ids++;
    port.message = space.message + " Port";
    port.course  = 0;
    port.ships   = {};
    port.say     = say.bind(port);

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
        port.course = course;
    };

    port.launch = function(id) {
        var ship = port.ships[id];
        port.say("launching", ship.message, ship.id, "to", port.course);
    };

    return port;
};

var ship_ids = 0;

space.Ship = function() {
    var ship     = {};
    ship.id      = ship_ids++;
    ship.message = space.message + " Ship";
    ship.ready   = false;
    ship.say     = say.bind(ship);

    ship.setReady = function() {
        ship.say("I'm ready!");
        this.ready = true;
    };

    return ship;
};

space.Ship.message =  "Ship";
