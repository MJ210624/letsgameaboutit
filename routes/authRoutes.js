const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser
} = require("../controllers/authController");

router.post("/register", registerUser);
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/", (req, res) => {
  res.render("home");
});
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;