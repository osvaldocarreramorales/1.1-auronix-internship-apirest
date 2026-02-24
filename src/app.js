const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();

// Solo se permiten peticiones para el puerto del frontend
const corsOptions = {
  origin: "http://localhost:5173",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware global para mostrar logs en cada peticion
app.use((req, res, next) => {
  const date = new Date();
  console.log(
    `Fecha: ${date.toLocaleString()}, Metodo: ${req.method}, URL: ${req.url}`,
  );
  next();
});

// prefijo api para las rutas
app.use("/api", apiRoutes);

module.exports = app;
