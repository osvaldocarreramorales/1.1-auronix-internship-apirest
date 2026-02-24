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

    // Tranformacion de datos dejando unicamente las propiedades del requerimiento
    // Remplazo de espacios por guiones bajo utilizando expresion regular
    const finalData = filteredData.map((character) => ({
      id: character.id,
      name: character.name.replace(/\s+/g, "_"),
      status: character.status,
      gender: character.gender,
    }));

    res.json({
      nextPage: data.info.next,
      results: finalData,
    });
  } catch (err) {
    next(err);
  }
};
