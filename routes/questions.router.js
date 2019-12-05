const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion
} = require("../controlers/questions.controller");


router.post('/', createQuestion)

router.get('/', getAllQuestions)

router.put('/:id', updateQuestion)

router.get('/:id', getQuestionById)

router.delete('/:id')

module.exports = router;