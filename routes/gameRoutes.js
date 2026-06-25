const express = require("express");
const router = express.Router();

const {
  renderSearchPage,
  searchGame,
  gameDetails
} = require("../controllers/gameController");

router.get("/games", renderSearchPage);
router.get("/games/search", searchGame);
router.get("/games/:id", gameDetails);
module.exports = router;