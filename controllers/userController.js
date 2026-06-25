const Review = require("../models/Review");

const profilePage = async (req, res) => {

  try {

    if (!req.session.user) {
      return res.redirect("/login");
    }

    const reviews = await Review.find({
      user: req.session.user.id
    });

    const totalReviews = reviews.length;

    let averageRating = 0;

    if (totalReviews > 0) {

      const totalStars = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );

      averageRating =
        (totalStars / totalReviews).toFixed(1);

    }

    res.render("profile", {
      user: req.session.user,
      reviews,
      totalReviews,
      averageRating
    });

  } catch (error) {

    console.log(error);

    res.status(500).send("Erro");

  }

};

module.exports = {
  profilePage
};