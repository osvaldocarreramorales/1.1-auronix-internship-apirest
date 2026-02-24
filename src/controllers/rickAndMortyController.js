const axios = require("axios");

// Endpoint para obtener los personajes con nombres modificados y filtrados
exports.getCharacters = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character",
    );
    const data = response.data;
    // Filtrado de personajes con status = alive
    const filteredData = data.results.filter((character) =>
      character.status.toLowerCase().includes("alive"),
    );

    res.json({
      nextPage: data.info.next,
      results: filteredData,
    });
  } catch (err) {
    next(err);
  }
};
