var express = require('express');
var router = express.Router();

var findTeams = require('../modules/findTeam.js');

router.get('/', function(req, res, next) {
    var name = req.query.name;
    findTeams(name, function (teamLocation) {
        res.send(teamLocation);
    });
});

module.exports = router;
