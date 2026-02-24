const express = require("express");
const apiRoutes = require("./routes/api");

const app = express();

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
