var mongoDbConnection = require('../lib/connection.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = function findTeam(name, type, callback) {
    mongoDbConnection(function (databaseConnection) {
        var locationQuery = {name: name, type: type};
        databaseConnection.collection("locations").findOne(locationQuery, function(err, result) {
            if (err) next(err);
            if (result == null) {
                res.status(400).send('Location not found!');
                return;
            }
            callback(result);
        });
    })
}
