const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {

    const {
      gameId,
      gameName,
      gameImage,
      rating,
      content
    } = req.body;

    const existingReview = await Review.findOne({
      user: req.session.user.id,
      gameId
    });

    if (existingReview) {
      return res.send("Você já avaliou este jogo.");
    }

    await Review.create({
  user: req.session.user.id,
  gameId,
  gameName,
  gameImage,
  rating,
  content
});

    res.redirect(`/games/${gameId}`);

  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao criar review");
  }
};

const editReview = async (req, res) => {
  try {

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.send("Review não encontrada");
    }

    if (
      review.user.toString() !==
      req.session.user.id
    ) {
      return res.send("Acesso negado");
    }

    review.rating = req.body.rating;
    review.content = req.body.content;

    await review.save();

    res.redirect(`/games/${review.gameId}`);

  } catch (error) {
    console.log(error);
    res.status(500).send("Erro");
  }
};

const deleteReview = async (req, res) => {
  try {

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.send("Review não encontrada");
    }

    if (
      review.user.toString() !==
      req.session.user.id
    ) {
      return res.send("Acesso negado");
    }

    const gameId = review.gameId;

    await Review.findByIdAndDelete(req.params.id);

    res.redirect(`/games/${gameId}`);

  } catch (error) {
    console.log(error);
    res.status(500).send("Erro");
  }
};


const reviewsPage = async (req, res) => {
  try {

    const reviews = await Review
      .find()
      .populate("user")
      .sort({ createdAt: -1 });

    res.render("reviews", {
      reviews
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Erro");
  }
};


module.exports = {
  createReview,
  editReview,
  deleteReview,
  reviewsPage
};