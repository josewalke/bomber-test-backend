const questionsModel = require('../models/questions.model')

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion
}

function createQuestion(req, res) {
  const questionBody = {
    enunciado: req.body.enunciado,
    imagen_url: "url de una imagen",
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
    .sort({tema_id: 1})
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
  // console.log(req.params.id)
  // console.log(req.body)
  questionsModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}
