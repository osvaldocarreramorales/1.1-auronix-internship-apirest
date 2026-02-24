const axios = require("axios");

// Endpoint para obtener los personajes con nombres modificados y filtrados
exports.getCharacters = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character",
    );
    const data = response.data;
    res.json({
      nextPage: data.info.next,
      results: data.results,
    });
  } catch (err) {
    next(err);
  }
};
