var mongoDbConnection = require('../lib/connection.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = function findTeam(name, res, callback) {
    mongoDbConnection(function (databaseConnection) {
        var teamQuery = {name:name, type:'team'};
        databaseConnection.collection("teams").findOne(teamQuery, function(err, result) {
            if (err) next(err);
            if (result == null) {
                res.status(400).send('Team not found!');
                return;
            }
            var room = result.room;
            var roomQuery = {_id: ObjectID.createFromHexString(room)};
            databaseConnection.collection("locations").findOne(roomQuery, function (err, result) {
                if (err) next(err);
                callback(result)
            })
        });
    })
}
