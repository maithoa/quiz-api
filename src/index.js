const express = require("express");
cors = require("cors");

const app = express();
app.use(cors());

var db = require('./db');
var AuthController = require('./auth/AuthController');
var QuestionController = require('./question/QuestionController');
var UserController = require('./user/UserController')
app.use('/api/auth', AuthController);
app.use('/api/quiz', QuestionController);
app.use('/api/user',UserController);

const questions = [
  {
    id: 1,
    question: "Which planet in our solar system is closest to the sun?",
    answer: "Mercury"
  },
  {
    id: 2,
    question:
      "Which actor played Richard III in the 1995 British film drama of the same title?",
    choices: ["Ian McKellen", "Partrick Stewart", "Elijah Wood"],
    answer: "Ian McKellen"
  },
  {
    id: 3,
    question:
      "Which Marvel superhero, also known as Steve Rogers, made his first appearance in March 1941?",
    answer: "Captain America"
  },
  {
    id: 4,
    question: "Which English football club play at Roots Hall?",
    choices: ["Liverpool", "Southend United", "Wolverhampton"],
    answer: "Southend United"
  }
];

app.get("/questions", (req, res) => {
  res.json(
    questions.map(({ id, question, choices }) => ({ id, question, choices }))
  );
});

app.get("/answer/:id", (req, res) => {
  const currentQuestion = questions.find(q => q.id == req.params.id);
  res.json({ id: currentQuestion.id, answer: currentQuestion.answer });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
