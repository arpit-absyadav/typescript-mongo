import app from '../src/app'
import * as db from './test.db'
import * as  supertest from 'supertest'
const request = supertest(app)

describe(`/ root API test`, () => {
  beforeAll(async () => {
    await db.connect()
  });
  afterEach(async () => {
    await db.clearDatabase()
  });
  afterAll(async () => {
    await db.closeDatabase()
  });

  it('App root API test', async () => {
    const response = await request.get(`/`)

    expect(response.status).toEqual(200);
    expect(response.body.data).toHaveProperty('message', 'Welcome');
  });
})