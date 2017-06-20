var mongoDbConnection = require('../lib/connection.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = function findTeam(name, callback) {
    mongoDbConnection(function (databaseConnection) {
        var departmentQuery = {name:name, type:'department'};
        databaseConnection.collection("teams").findOne(departmentQuery, function(err, result) {
            if (err) next(err);
            if (result == null) {
                res.status(400).send('Department not found!');
                return;
            }
            var departmentId = result._id.toHexString();
            var teamQuery = {parent: departmentId};
            databaseConnection.collection("teams").find(teamQuery).toArray(function (err, result) {
                if (err) next(err);
                callback(result);
            });
        });
    });
};
