var express = require('express');
var router = express.Router();

var findTeam = require('../modules/findTeam.js');

router.get('/', function(req, res, next) {
    var name = req.query.name;
    findTeam(name, res, function (teamLocation) {
        res.send([teamLocation]);
    });
});

module.exports = router;
