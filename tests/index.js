var grape = require('grape'),
    Couchector = require('../');

var couchbaseMock = {
    "Connection": function(settings, callback){
        callback(null);
    }
}

grape('can instantiate a couchector', function(t){
    t.plan(1);

    var couchector = new Couchector(couchbaseMock);

    t.pass();
});

grape('can create a couchector connector', function(t){
    t.plan(2);

    var couchector = new Couchector(couchbaseMock),
        connector = couchector.createConnector({}, function(error, connector){
            if(error){
                return t.fail(error, 'createConnector errored');
            }
            t.pass('couchector connector connected');
        });

    connector(function(error, bucket){
        if(error){
            return t.fail(error, 'createConnector errored');
        }
        t.ok(bucket, 'Recieved bucket');
    });
});

grape('can have multiple conector callbacks', function(t){
    t.plan(3);

    var couchector = new Couchector(couchbaseMock),
        connector = couchector.createConnector({}, function(error, connector){
            if(error){
                return t.fail(error, 'createConnector errored');
            }
            t.pass('couchector connector connected');
        });

    connector(function(error, bucket){
        if(error){
            return t.fail(error, 'createConnector errored');
        }
        t.ok(bucket, 'Recieved bucket once');
    });

    connector(function(error, bucket){
        if(error){
            return t.fail(error, 'createConnector errored');
        }
        t.ok(bucket, 'Recieved bucket twice');
    });
});