(function (database) {

    var mongodb = require('mongodb');
    var mongourl = "mongodb://vgrace:Traits_api2016@ds053126.mlab.com:53126/traitsdb";//
    var theDb = null;

    database.getDb = function (next) {
        if (!theDb) {
            //connect to the db
            mongodb.MongoClient.connect(mongourl, function (err, db) {
                if (err) {
                    next(err, null);//call the callback func with the error, db = null
                }
                else {
                    theDb = {
                        db: db,
                        users: db.collection("users"),
                        personalities: db.collection("personalities"),
                        people: db.collection("people"),
                        descriptions: db.collection("descriptions")
                    }
                    next(null, theDb); //return null error and the db-object
                }
            });
        }
        else {
            next(null, theDb); //no error, a connection is open and return db
        }
    }

})(module.exports);