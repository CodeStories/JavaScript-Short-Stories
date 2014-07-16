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

story.Create = function(ammount, constructor) {
    var list = [];
    var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < ammount; i++) {
        list.push(constructor.apply(null, args));
    }
    return list;
};

story.upTo = function(value) {
    return Math.floor(Math.random() * value);
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

story.allThe = function(list) {
    return {
        do: function(f_name) {
            var args = Array.prototype.slice.call(arguments, 1);
            list.map(function(e) {
                e[f_name].apply(null, args);
            });
        }
    };
};
