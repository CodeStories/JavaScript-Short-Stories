var space = module.exports = {};

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
    return new Error("Destination "+d+" doesn't have a planet.");
};

var port_ids = 0;

space.Port = function() {
    var port     = {};
    port.id      = port_ids++;
    port.message = space.message + " Port";
    port.ships   = {};

    port.host = function(ship) {
        console.log(port.message, port.id, "hosting ship:", ship.id);
        port.ships[ship.id] = ship;
    };

    port.isReady = function(id) {
        var answer = port.ships[id].ready ? "yes!" : "no.";
        console.log(port.message, port.id, "is", id, "ready?", answer);
        return port.ships[id].ready;
    };

    port.launch = function(id) {
        var ship = port.ships[id];
        console.log(port.message, port.id, "is launching", ship.message, ship.id);
    };

    console.log("New", port.message, port.id);
    return port;
};

var ship_ids = 0;

space.Ship = function() {
    var ship     = {};
    ship.id      = ship_ids++;
    ship.message = space.message + " Ship";
    ship.ready   = false;

    ship.setReady = function() {
        console.log(this.message, this.id, "is ready!");
        this.ready = true;
    };

    console.log("New Ship", ship.id);
    return ship;
};

space.Ship.message =  "Ship";
