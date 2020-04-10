const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "daian luis costa 2",
        whatsapp: "51991120217",
        email: "desenvolvimentodaian@gmail.com",
        city: "porto-alegre",
        uf: "RS"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
