import { SequelizeManager } from './../src/common/managers/sequelize.manager';
import 'jest-extended';
import app from '../src/app';
import * as request from 'supertest';
jest.setTimeout(30000);
jest.useFakeTimers();

beforeEach(() => {
  jest.useFakeTimers();
});

const headers = {
  'user-id': 1,
};

beforeEach(async () => {
  jest.useFakeTimers();
});

const baseUrl = '/';
describe(`GET ${baseUrl} - Get All`,  () => {
  it('Hello API Request', async () => {
    const response = await request(app).get(baseUrl).set(headers);

console.log(response)
    expect(response.status).toEqual(200);
    // expect(response.body).toHaveProperty('data');
    // expect(response.body).();
    // expect(response.body.data).toHaveProperty('message', 'Welcome');
  });
});
