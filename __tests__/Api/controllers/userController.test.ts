//import { test } from 'tap';
//import build from "../../../src/api/server";
import request from "supertest";
//import models from "../../../src/api/models";
import app from "../../../src/api/server";
//import sequelize from "sequelize";
import { sequelize } from "../../../src/database/database.config";
import { up as userUp} from "../../../src/database/seeders/20230628220937-demo-user";
import { up as userFilesUp} from "../../../src/database/seeders/20230704204508-demo-user-file";



// Mock the 'database.js' module that imports Sequelize
//change environment to test
process.env.TEST_ENV = "test";

describe('API tests', () => {
  test('Response sould be success', async () => {
    const queryInterface = sequelize.getQueryInterface()
    await sequelize.sync({ force: true });
    //await userFilesUp(queryInterface, sequelize);
    //await userUp(queryInterface, sequelize);

    const response = await request(app).get('/api/v1/users');
    console.log({body:response["_body"]})

    expect(response.status).toBe(200);
    //expect(response.body).toEqual({ mensaje: 'Respuesta exitosa' });
  });

/*   test('Debería crear un nuevo recurso en la API', async () => {
    const response = await request(app)
      .post('/api/recurso')
      .send({ nombre: 'Nuevo recurso' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  }); */
});
