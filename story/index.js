var story = module.exports;

story.tools = {};

story.tools.map = function(list) {
    var f = this.f;
    return list.map(f);
};

story.scenary = function(name) {
    return require("./scenaries/"+name);
};

story.Create = function(ammount, obj) {
    console.log("Creating", ammount, obj.message+"s");
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
