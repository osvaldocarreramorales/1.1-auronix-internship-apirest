// Aqui se definen todas las rutas
const express = require("express");
const router = express.Router();

const statusController = require("../controllers/statusController");
const rickAndMortyController = require("../controllers/rickAndMortyController");

router.get("/status", statusController.checkStatus);
router.get("/characters", rickAndMortyController.getCharacters);

module.exports = router;
