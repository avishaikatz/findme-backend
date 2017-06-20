var mongoDbConnection = require('../lib/connection.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = function findTeam(key, value, type, res, callback) {
    mongoDbConnection(function (databaseConnection) {
        var locationQuery = {type: type};
        locationQuery[key] = new RegExp('.*' + value + '.*');
        databaseConnection.collection("locations").find(locationQuery).toArray(function(err, result) {
            if (err) next(err);
            if (result == null) {
                res.status(400).send('Location not found!');
                return;
            }
            callback(result);
        });
    })
}
