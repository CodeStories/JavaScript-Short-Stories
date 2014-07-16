var tools = module.exports;

tools.say = function() {
    var args = Array.prototype.slice.call(arguments);
    return process.stdout.write([this.message, this.id, "said:"].concat(args).join(" ")+"\n");
};

tools.getId = function(name, collection) {
    if (!collection.__ids) collection.__ids = 0;
    if (name) {
        var _name = name;
        var count = 2;
        while (collection[_name]) {
            _name = name + " " + count++;
        }
        collection[_name] = true;
        return _name;
    } else {
        var id = collection.__ids++;
        collection[id] = true;
        return id;
    }
};
