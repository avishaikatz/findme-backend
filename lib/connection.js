var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
//the MongoDB connection
var connectionInstance;

module.exports = function(callback) {
    //if we already have a connection, don't connect to database again
    if (connectionInstance) {
        callback(connectionInstance);
        return;
    }

    var db = new Db('findme', new Server("13.92.112.33", 27017, { auto_reconnect: true }));
    db.open(function(error, databaseConnection) {
        if (error) throw new Error(error);
        connectionInstance = databaseConnection;
        callback(databaseConnection);
    });
};