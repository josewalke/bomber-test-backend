const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllTests,
  getTestById,
  createRandomTest,
  createConfigTest,
  getMyTests,
  postExam,
  deleteDesafio,
  updateTest
} = require("../controlers/tests.controller");

router.get("/user/:id", getMyTests);
router.get("/:id", getTestById);
// router.get("/:id", getTestById);
router.get("/", getAllTests);
router.post("/exam",postExam);
router.post("/config", authenticated, createConfigTest);
router.post("/", authenticated, createRandomTest);
router.put("/:id", updateTest);
router.delete("/desafio", deleteDesafio);
router.delete("/:id");

module.exports = router;


