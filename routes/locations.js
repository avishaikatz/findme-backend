var express = require('express');
var router = express.Router();

var findLocation = require('../modules/findLocation.js');

router.get('/', function(req, res, next) {
    var name = req.query.name;
    var type = req.query.type;
    findLocation(name, type, function (location) {
        res.send(location);
    })
});

module.exports = router;
