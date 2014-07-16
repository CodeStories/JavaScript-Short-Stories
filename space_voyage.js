var story = require("./story");
var space = story.scenary("space");

var spaceport = new space.Port();
var ships     = story.Create(3, space.Ship, "Destroyer");
var voyager   = space.Ship("USS Voyager");

ships.push(voyager);

story.do(spaceport.host).allThe(ships);

voyager.setReady();

try {
    voyage(spaceport, [voyager.id], space.RandomDestination());
} catch(e) {
    console.error(e);
}

function voyage(spaceport, ship_ids, destination) {
    spaceport.setCourseTo(destination);
    story.do(spaceport.launch).allThe(ship_ids.filter(function(id) {
        return spaceport.isReady(id);
    }));
}
