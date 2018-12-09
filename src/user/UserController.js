
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');
var usersProjection = { 
        __v: false,
        _id: false
    };

// UPDATES A LATEST SCORE OF A USER IN THE DATABASE
router.put('/updatescore/:id', function (req, res) {
    var conditions = {"_id":req.params.id};
    var updates = { $set: { "latestScored" : req.body.newScore } };
    var options = {new: true};
    User.findOneAndUpdate(conditions, updates ,options , function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the latest score for user.");
        res.status(200).send({id:user._id, latestScored: user.latestScored});
    });
});

// GETS 3 TOP SCORED USERS IN THE DATABASE
router.get('/top3', function (req, res) {
    var options = {
        "sort": '-latestScored',
        "limit": 3
    };
    var fields =  {
           "name": 1,
           "latestScored":1 
        };

    User.find({},{},options
        ,function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the top 3 users." + err);
        res.status(200).send(
             users.map(({ id, name, latestScored }) => ({ id, name, latestScored }))
            );
    });
});

// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;