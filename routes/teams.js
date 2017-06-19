var express = require('express');
var router = express.Router();

var mongoDbConnection = require('../lib/connection.js');
var ObjectID = require('mongodb').ObjectID;
var ObjectId = new ObjectID();

router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    mongoDbConnection(function (databaseConnection) {
        var teamQuery = {name:name};
        databaseConnection.collection("teams").findOne(teamQuery, function(err, result) {
            if (err) next(err);
            var room = result.room;
            var roomQuery = {_id: ObjectID.createFromHexString(room)};
            databaseConnection.collection("locations").findOne(roomQuery, function (err, result) {
                if (err) next(err);
                res.send(result);
            })
        });
    })
});

module.exports = router;
