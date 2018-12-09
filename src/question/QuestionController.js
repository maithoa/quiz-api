
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Question = require('./Question');
var VerifyToken = require('../auth/VerifyToken');

// CREATES A NEW QUESTION
router.post('/add', function (req, res) {
    var newChoices = [];
    var arrChoices ;
    var newQuestion;

    if (!req.body.choices || req.body.choices.length ===0) {
        newQuestion = {
            question : req.body.question,
            answer : req.body.answer
        };

    } else {
        arrChoices = req.body.choices.split(',');
        arrChoices.forEach(function(obj){
            newChoices.push(obj.trim());
        });

       
        newQuestion = {
            question : req.body.question,
            choices : newChoices,
            answer : req.body.answer
        };
    }   

    Question.create(newQuestion, 
        function (err, question) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(question);
        });
});

// RETURNS ALL THE QUESTIONS IN THE DATABASE
router.get('/', function (req, res) {
    Question.find({}, function (err, questions) {        
        if (err) return res.status(500).send("There was a problem finding the questions.")
        if (questions){
            res.status(200).send(
                questions.map(({ id, question, choices }) => ({ id, question, choices }))
            );
        }
    });
});
// GETS A SINGLE QUESTION'S ANSWER FROM THE DATABASE
router.get('/answer/:id', function (req, res) {
    Question.findById(req.params.id, function (err, question) {
        if (err) return res.status(500).send("There was a problem finding the answer.");
        if (!question) return res.status(404).send("No answer found.");
        res.status(200).send({ id: question.id, answer: question.answer });
    });
});

// DELETES A QUESTION FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Question.findByIdAndRemove(req.params.id, function (err, question) {
        if (err) return res.status(500).send("There was a problem deleting the question.");
        res.status(200).send("Question was deleted.");
    });
});

// NO NEED TO UPDATE QUESTION- IT CAN BE DONE BY SIMPLE DELETE AND ADD


module.exports = router;