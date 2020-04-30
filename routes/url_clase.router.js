const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  postURL,
  getURL,
  putURL
} = require("../controlers/url_clase.controller");


router.post('/', postURL)

router.put('/:id',putURL)

router.get('/', getURL)

router.delete('/:id',)

module.exports = router;