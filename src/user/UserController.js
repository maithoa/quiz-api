var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var VerifyToken = require("../auth/VerifyToken");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require("./User");
var usersProjection = {
    __v: false,
    _id: false
};

// UPDATES A LATEST SCORE OF A USER IN THE DATABASE
router.put("/updatescore/:id", VerifyToken, function(req, res) {
    var conditions = { _id: req.params.id };
    var updates = { $set: { latestScored: req.body.newScore } };
    var options = { new: true };
    User.findOneAndUpdate(conditions, updates, options, function(err, user) {
        if (err)
            return res
                .status(500)
                .send(
                    "There was a problem updating the latest score for user."
                );
        res.status(200).send({ id: user._id, latestScored: user.latestScored });
    });
});

// GETS 3 TOP SCORED USERS IN THE DATABASE - NO NEED TO SECURE
router.get("/top3", function(req, res) {
    var options = {
        sort: "-latestScored",
        limit: 3
    };
    var fields = {
        name: 1,
        email: 1,
        latestScored: 1
    };

    User.find({}, {}, options, function(err, users) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the top 3 users." + err);
        res.status(200).send(
            users.map(({ id, email, name, latestScored }) => ({
                id,
                email,
                name,
                latestScored
            }))
        );
    });
});

module.exports = router;
