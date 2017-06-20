var express = require('express');
var router = express.Router();

var mongoDbConnection = require('../lib/connection.js');
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
    var name = req.query.name;
    var type = req.query.type;
    mongoDbConnection(function (databaseConnection) {
        var locationQuery = {name: name, type: type};
        databaseConnection.collection("locations").findOne(locationQuery, function(err, result) {
            if (err) next(err);
            if (result == null) {
                res.status(400).send('Location not found!');
                return;
            }
            res.send(result);
        });
    })
});

module.exports = router;
