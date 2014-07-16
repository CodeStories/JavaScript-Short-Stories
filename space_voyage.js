var story = require("./story");
var space = story.scenary("space");

var spaceport = new space.Port();
var ships     = story.Create(3, space.Ship);

story.do(spaceport.host).allThe(ships);

ships[0].setReady();

try {
    voyage(spaceport, [ships[0].id], space.RandomDestination());
} catch(e) {
    console.error(e);
}

function voyage(spaceport, ship_ids, destination) {
    if (!space.existsWoldAt(destination)) {
        throw space.DestinationError(destination);
    }
    story.do(spaceport.launch).allThe(ship_ids.filter(function(id) {
        return spaceport.isReady(id);
    }));
}
