function Couchector(couchbase){
    this.couchbase = couchbase;
}

Couchector.prototype.createConnector = function(settings, callback){
    var ready,
        callbacks = [],
        connection = new this.couchbase.Connection(settings, function(error){
            if(error){
                return callback(error);
            }
            ready = true;
            callback(null, connection);
            callbacks.forEach(function(callback){
                callback(null, connection);
            });
        });

    var connector = function(callback){
        if(ready){
            return callback(null, connection);
        }

        callbacks.push(callback);
    };

    return connector;
};

module.exports = Couchector;