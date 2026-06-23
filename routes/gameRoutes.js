const express = require("express");
const router = express.Router();

const {
  renderSearchPage,
  searchGame
} = require("../controllers/gameController");

router.get("/games", renderSearchPage);

router.get("/games/search", searchGame);

module.exports = router;