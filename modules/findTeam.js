var mongoDbConnection = require('../lib/connection.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = function findTeam(name, res, callback) {
    mongoDbConnection(function (databaseConnection) {
        var teamQuery = {name:new RegExp('.*' + name + '.*'), type:'team'};
        databaseConnection.collection("teams").find(teamQuery).toArray(function(err, result) {
            if (err) next(err);
            if (result == null) {
                res.status(400).send('Team not found!');
                return;
            }
            var roomPromises = result.map(function (team) {
                var room = team.room;
                var roomQuery = {_id: ObjectID.createFromHexString(room)};
                return new Promise(resolve => databaseConnection.collection("locations").findOne(roomQuery, function (err, result) {
                    if (err) next(err);
                    resolve(result)
                })
                )
            });
            Promise.all(roomPromises)
                .then(rooms => callback(rooms));
        });
    })
}
