var express = require('express');
var router = express.Router();

var findDepartment = require('../modules/findDepartment.js');
var findTeam = require('../modules/findTeam.js');

router.get('/', function(req, res, next) {
    var name = req.query.name;
    findDepartment(name, res, function (teams) {
        var roomPromises = teams.map(function (team) {
            var teamName = team['name'];
            return new Promise(resolve =>
                    findTeam(teamName, function (room) {
                        resolve(room);
                    })
            )
        });
        Promise.all(roomPromises)
            .then(rooms => res.send(rooms));
    });
});

module.exports = router;
