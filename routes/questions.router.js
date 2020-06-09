const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  getQuestion
} = require("../controlers/questions.controller");


router.post('/', createQuestion)

router.get('/', getAllQuestions)

router.post('/especifico',getQuestion)

router.get('/:id', getQuestionById)

router.put('/:id', updateQuestion)

router.delete('/:id')

module.exports = router;