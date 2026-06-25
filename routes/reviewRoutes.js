const express = require("express");
const router = express.Router();

const {
  createReview,
  editReview,
  deleteReview,
  reviewsPage
} = require("../controllers/reviewController");

router.post("/reviews/create", createReview);

router.post("/reviews/edit/:id", editReview);

router.post("/reviews/delete/:id", deleteReview);

router.get("/reviews", reviewsPage);

module.exports = router;