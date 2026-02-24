const axios = require("axios");

// Endpoint para obtener los personajes con nombres modificados y filtrados
exports.getCharacters = async (req, res, next) => {
  try {
    // Pagina por defecto 1
    let { page = 1 } = req.query;

    // Validacion si page no es un numero
    // le asignamos la pagina por defecto
    if (isNaN(page)) {
      page = 1;
    }

    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}`,
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
      image: character.image,
    }));

    // Tranformacion de ruta externa en una ruta local
    // Para seguir haciendo peticiones pero a mi api local
    const formatLocalUrl = (externalURL) => {
      if (!externalURL) return null;
      const urlObj = new URL(externalURL);
      const pageNum = urlObj.searchParams.get("page");
      return `http://localhost:3000/api/characters?page=${pageNum}`;
    };

    res.status(200).json({
      prevPage: formatLocalUrl(data.info.prev),
      nextPage: formatLocalUrl(data.info.next),
      results: finalData,
    });
  } catch (err) {
    next(err);
  }
};
