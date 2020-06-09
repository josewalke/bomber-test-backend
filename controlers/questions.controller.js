const questionsModel = require('../models/questions.model')

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  getQuestion
}

function createQuestion(req, res) {
  // console.log(req.body)
  const questionBody = {
    enunciado: req.body.enunciado,
    imagen_url: req.body.photo,
    answers_wrong: req.body.answers_wrong,
    answers: req.body.answers,
    tema_id: req.body.tema_id,
    category: req.body.category,
    difficulty: req.body.difficulty
  };

  questionsModel.create(questionBody)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

function getAllQuestions(req, res) {
  questionsModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getQuestionById(req, res) {
  questionsModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateQuestion(req, res) {

  questionsModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

async function getQuestion(req,res){
  questionsModel
    .find(req.body)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}