const { searchGames } = require("../services/rawgService");

const renderSearchPage = (req, res) => {
  res.render("games", {
    games: [],
    search: ""
  });
};

const searchGame = async (req, res) => {

  const { search } = req.query;

  const games = await searchGames(search);

  res.render("games", {
    games,
    search
  });

};

module.exports = {
  renderSearchPage,
  searchGame
};