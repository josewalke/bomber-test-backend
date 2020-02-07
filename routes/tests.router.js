const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllTests,
  getTestById,
  createRandomTest,
  createConfigTest,
  getMyTests,
<<<<<<< HEAD
  updateTest
=======
  postExam,
  deleteDesafio
>>>>>>> 6cf3c4824e912c22eee81a5beaddbca368aae98d
} = require("../controlers/tests.controller");

router.get("/user/:id", getMyTests);
router.get("/:id", getTestById);
router.get("/", getAllTests);
router.post("/exam",postExam);
router.post("/config", authenticated, createConfigTest);
router.post("/", authenticated, createRandomTest);
<<<<<<< HEAD
router.put("/:id", authenticated, updateTest);
=======
router.put("/:id");
router.delete("/desafio", deleteDesafio);
>>>>>>> 6cf3c4824e912c22eee81a5beaddbca368aae98d
router.delete("/:id");

module.exports = router;
