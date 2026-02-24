// Endpoint para verificar que express este corriendo.
exports.checkStatus = (req, res) => {
  const now = new Date();
  res.json({
    status: "Online",
    date: now.toLocaleString(),
  });
};
