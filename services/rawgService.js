const axios = require("axios");

const BASE_URL = "https://api.rawg.io/api";

async function searchGames(searchTerm) {
  try {

    const response = await axios.get(
      `${BASE_URL}/games`,
      {
        params: {
          key: process.env.RAWG_API_KEY,
          search: searchTerm
        }
      }
    );

    return response.data.results;

  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = {
  searchGames
};