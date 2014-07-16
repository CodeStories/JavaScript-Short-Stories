var story  = require("./story");
var nature = story.scenary("nature");

var butterfly = nature.Cow("butterfly");
var calf      = butterfly.newChild();
var kids      = story.Create(story.upTo(10), nature.Human, "child");

story.allThe(kids).do("want", calf);

butterfly.hide(calf, "hummocks");
