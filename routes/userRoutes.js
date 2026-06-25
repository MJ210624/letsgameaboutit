const express = require("express");
const router = express.Router();

const {
  profilePage
} = require("../controllers/userController");

router.get("/profile", profilePage);

module.exports = router;