import 'jest-extended';
import app from '../src/app';
import * as request from 'supertest';
import { MongooseManager } from '../src/common/managers/mongoose.manager';
jest.setTimeout(30000);
jest.useFakeTimers();

beforeEach(() => {
  jest.useFakeTimers();
});

const headers = {
  'user-id': 1,
};
beforeAll(async() => {
  const mongooseManager = new MongooseManager();
  const a = await mongooseManager.init();
  console.log('asdfasdfa data base established');
  console.log(a);
  
})

beforeEach(async () => {
  jest.useFakeTimers();
});

const baseUrl = '/';
describe(`GET ${baseUrl} - Get All`,  () => {
  it('Hello API Request', async () => {
    const response = await request(app).get(baseUrl).set(headers);

    expect(response.status).toEqual(200);
    // expect(response.body).toHaveProperty('data');
    // expect(response.body).();
    // expect(response.body.data).toHaveProperty('message', 'Welcome');
  });

  it('Hello API Request', async () => {
    const response = await request(app).post(`${baseUrl}users/signup`).set(headers).send({
      "first_name": "Arpit Update",
     "last_name": "yadav",
     "gender": "male",
     "email": "sonu@gmail.com",
     "password": "arpit",
     "role": "admin"
 });

console.log(response)
    expect(response.status).toEqual(200);
    // expect(response.body).toHaveProperty('data');
    // expect(response.body).();
    // expect(response.body.data).toHaveProperty('message', 'Welcome');
  });
});
