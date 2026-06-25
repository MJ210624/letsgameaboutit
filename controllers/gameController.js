const { searchGames, getGameById } = require("../services/rawgService");

const renderSearchPage = (req, res) => {
  res.render("games", {
    games: [],
    search: ""
  });
};

const searchGame = async (req, res) => {
  try {

    const search = req.query.search?.trim();

    if (!search) {
      return res.render("games", {
        games: [],
        search: ""
      });
    }

    const games = await searchGames(search);

    const filteredGames = games
      .filter(game =>
        game.name &&
        game.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {

        const aStarts = a.name
          .toLowerCase()
          .startsWith(search.toLowerCase());

        const bStarts = b.name
          .toLowerCase()
          .startsWith(search.toLowerCase());

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return b.rating - a.rating;
      })
      .slice(0, 12);

    res.render("games", {
      games: filteredGames,
      search
    });

  } catch (error) {
    console.log(error);

    res.render("games", {
      games: [],
      search: "",
      error: "Erro ao buscar jogos."
    });
  }
};

const gameDetails = async (req, res) => {
  try {

    const { id } = req.params;

    const game = await getGameById(id);

    const reviews = await Review
      .find({ gameId: id })
      .populate("user");

    res.render("gameDetails", {
      game,
      reviews
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Erro");
  }
};

const Review = require("../models/Review");

module.exports = {
  renderSearchPage,
  searchGame,
  getGameById,
  gameDetails
};