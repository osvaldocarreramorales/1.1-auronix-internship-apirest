const rickAndMortyController = require("../controllers/rickAndMortyController");
const axios = require("axios");

// simular axios para controlar respuestas
jest.mock("axios");

describe("test unitario de rick and morty controller", () => {
  let req;
  let res;
  let next;

  // antes de cada test limpiamos los mocks y  inicializamos req, res y next
  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  // test si responde exitosamente
  describe("deberia responder exitosamente", () => {
    it("cuando la api devuelve personajes", async () => {
      const mockApiResponse = {
        info: {
          next: "https://rickandmortyapi.com/api/character/?page=2",
          prev: null,
        },
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            gender: "Male",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          },
          {
            id: 2,
            name: "Morty Smith",
            status: "Alive",
            gender: "Male",
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          },
          {
            id: 3,
            name: "Bird Person",
            status: "Dead",
            gender: "Male",
            image: "https://rickandmortyapi.com/api/character/avatar/47.jpeg",
          },
        ],
      };

      // simula la respuesta de axios con los datos de mockApiResponse
      axios.get.mockResolvedValue({ data: mockApiResponse });

      // llamamos a la funcion del controlador utiliza los mocks en lugar de hacer una peticion real
      await rickAndMortyController.getCharacters(req, res, next);

      // accedemos a la respuesta que se envio con res.json de la primer llamada y el primer argumento
      const response = res.json.mock.calls[0][0];

      expect(res.status).toHaveBeenCalledWith(200);

      // valida que response tenga las propiedades que esperamos
      expect(response).toHaveProperty("results");
      expect(response).toHaveProperty("nextPage");
      expect(response).toHaveProperty("prevPage");

      // result deberia ser un arreglo, nextpage un string y la pagina previa null
      expect(response.results).toEqual(expect.any(Array));
      expect(response.nextPage).toEqual(expect.any(String));
      expect(response.prevPage).toBeNull();

      // probar la funciionalida de filtrado, devuelve solo personajes vivos
      expect(response.results.length).toBe(2);

      // verifica que el primer personaje tengas las propiedades correctas
      expect(response.results[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          status: "Alive",
          gender: expect.any(String),
          image: expect.any(String),
        }),
      );

      // verifica que el nombre del primer personaje contengan guion bajo
      expect(response.results[0].name).toBe("Rick_Sanchez");

      // verifica que el nombre del primer personaje no contenga espacios con ayuda de la expresion regular
      expect(response.results[0].name).not.toMatch(/\s/);
    });
  });

  describe("deberia responder con error", () => {
    it("cuando axios lanza un error", async () => {
      const mockError = new Error("API Error");

      // simula que la respuesta es un error
      axios.get.mockRejectedValue(mockError);

      await rickAndMortyController.getCharacters(req, res, next);

      // espera que next haya sido llamado con un error simulado
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});
