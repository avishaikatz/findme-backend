var express = require('express');
var router = express.Router();

var findLocation = require('../modules/findLocation.js');

router.get('/', function(req, res, next) {
    var name = req.query.name;
    var type = req.query.type;
    var tag = req.query.tag;
    if (name != undefined) {
        findLocation('name', name, type, res, function (location) {
            res.send(location);
        })
    }
    else if (tag != undefined) {
        findLocation('tags', tag, type, res, function (location) {
            res.send(location);
        })
    }
    else {
        res.status(400).send('Location not found!');
        return;
    }
});

module.exports = router;
