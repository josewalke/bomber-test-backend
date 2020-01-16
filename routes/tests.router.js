const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  getAllTests,
  getTestById,
  createRandomTest,
  createConfigTest,
  getMyTests
} = require("../controlers/tests.controller");

router.get("/user/:id", getMyTests);
router.get("/:id", getTestById);
router.post("/config", authenticated, createConfigTest);
router.post("/", authenticated, createRandomTest);
router.put("/:id");
router.delete("/:id");

module.exports = router;
