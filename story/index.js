var story = module.exports;

story.tools = {};

story.tools.map = function(list) {
    var f = this.f;
    return list.map(f);
};

story.scenary = function(name) {
    var scenary = require("./scenaries/"+name);
    console.log(scenary.init_message);
    return scenary;
};

story.Create = function(ammount, obj) {
    var list = [];
    for (var i = 0; i < ammount; i++) {
        list.push(new obj());
    }
    return list;
};

story.selectAll = function(key) {
    return {
        from: story.tools.map.bind({ f: function(e) {
            return e[key];
        }})
    };
};

story.do = function(f) {
    return {
        allThe: story.tools.map.bind({ f: f })
    };
};
