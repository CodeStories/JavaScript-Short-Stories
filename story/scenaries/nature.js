var tools = require("../tools");
var say   = tools.say;

var nature = module.exports = {};

nature.init_message = "Savannah... Savannah...";

nature.message = "Nature";

var cows = {};

nature.Cow = function(name) {
    var cow     = {};
    cow.id      = tools.getId(name, cows);
    cow.message = nature.message + " cow";
    cow.calfs   = {};
    cow.mother  = "";
    cow.hidden  = null;
    cow.say     = say.bind(cow);

    cow.newChild = function() {
        var calf = nature.Cow("calf");
        cow.calfs[calf.id] = calf;
        calf.mother  = cow.id;
        calf.message = cow.id + "'s";
        cow.say("gave birth to", calf.id);
        return calf;
    };

    cow.hide = function(calf, where) {
        if (!cow.calfs[calf.id]) {
            throw nature.ChildError(calf.id, cow.id);
        }
        cow.say("hiding", calf.id, "in the", where);
        calf.hidden = where;
    };

    return cow;
};

var humans = {};

nature.Human = function(name) {
    var human     = {};
    human.id      = tools.getId(name, humans);
    human.message = nature.message + " human";
    human.say     = say.bind(human);
    human.wants   = [];

    human.want = function(obj) {
        human.say("I want", obj.message, obj.id);
        human.wants.push(obj);
    };

    return human;
};
