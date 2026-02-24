const app = require("../app");

describe("test de integracion", () => {
  let server;
  const PORT = 3000;

  // antes de realizar test levantar server
  beforeAll((done) => {
    server = app.listen(PORT, done);
  });

  // despues de realizar todos los test, cerrar el server
  afterAll((done) => {
    server.close(done);
  });

  describe("test endpoint /status", () => {
    // caso de prueba endopoint status
    it("Deberia devolver status 200", async () => {
      const response = await fetch(`http://localhost:${PORT}/api/status`);
      expect(response.status).toBe(200);
    });
  });

  describe("test endpoint /characters", () => {
    // primer caso
    it("Deberia devolver 8 personajes en la pagina 1", async () => {
      const response = await fetch(`http://localhost:${PORT}/api/characters`);
      const data = await response.json();
      expect(response.status).toBe(200);
      // Expect lo que devuelve el endpoint toBe lo que esperamos que devuelva
      expect(data.results.length).toBe(8);
    });

    // segundo caso
    it("Deberia devolver las propiedades de los personajes correctamente", async () => {
      const response = await fetch(`http://localhost:${PORT}/api/characters`);
      const data = await response.json();
      expect(response.status).toBe(200);
      // Expect lo que devuelve el endpoint toBe lo que esperamos que devuelva
      expect(data.results[0]).toHaveProperty("id");
      expect(data.results[0]).toHaveProperty("name");
      expect(data.results[0]).toHaveProperty("status");
      expect(data.results[0]).toHaveProperty("gender");
      expect(data.results[0]).toHaveProperty("image");

      expect(data.results[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          status: expect.any(String),
          gender: expect.any(String),
          image: expect.any(String),
        }),
      );
    });
  });
});
