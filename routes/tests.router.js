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
  testAnswer,
  updateTest,
  testPremium,
  updateDeberes,
  updateNota,
  reload,
  myCurrentTest

} = require("../controlers/tests.controller");

router.get("/premium", testPremium)
router.get("/user/me/:id", getMyTests);
router.put("/deberes/:id",updateDeberes);
router.put("/nota/:id",updateNota);
router.put("/reload/:id",reload);
router.get("/", getAllTests);
router.post("/exam",postExam);
router.post("/config",authenticated, createConfigTest);
router.post("/", authenticated, createRandomTest);
router.put("/:id", testAnswer);
router.delete("/desafio", deleteDesafio);
router.delete("/:id");
router.get("/:id", getTestById);
router.get("/prueba/:id",myCurrentTest);

module.exports = router;
