const axios = require("axios");

const BASE_URL = "https://api.rawg.io/api";

async function searchGames(searchTerm) {
  try {
    const response = await axios.get(
      `${BASE_URL}/games`,
      {
        params: {
          key: process.env.RAWG_API_KEY,
          search: searchTerm,
          page_size: 20
        }
      }
    );

    return response.data.results;

  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getGameById(id) {
  try {

    const response = await axios.get(
      `${BASE_URL}/games/${id}`,
      {
        params: {
          key: process.env.RAWG_API_KEY
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  searchGames,
  getGameById
};