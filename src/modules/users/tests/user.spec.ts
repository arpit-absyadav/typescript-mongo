import app from '../../../app'
import * as db from '../../../../tests/test.db'
import * as  supertest from 'supertest'
const request = supertest(app)

const createUser = async (user: any) => {
  const response = await request.post(`/users/signup`).send(user);
  return response;
}

describe('/users Test Suits', () => {
  beforeAll(async () => {
    await db.connect()
  });
  afterEach(async () => {
    await db.clearDatabase()
  });
  afterAll(async () => {
    await db.closeDatabase()
  });

  const user = {
    "first_name": "Arpit",
    "last_name": "Yadav",
    "gender": "male",
    "email": "sonu@gmail.com",
    "password": "arpit",
    "role": "admin"
  }
  it('It should create user and return access token and refresh token.', async () => {

    const response = await request.post(`/users/signup`).send(user);

    expect(response.status).toEqual(200);
    const data = response.body.data;
    expect(response.status).toBe(200);
    expect(data.user).toEqual(expect.objectContaining({
      first_name: "Arpit",
      last_name: "Yadav",
      gender: "male",
      email: "sonu@gmail.com",
    }));
    expect(data.user).toHaveProperty('refresh_token');
    expect(response.body.data).toHaveProperty('access_token');
  });

  it('should return a token if email and password are valid', async () => {
    const newUser = await createUser({
      "first_name": "Arpit",
      "last_name": "Yadav",
      "gender": "male",
      "email": "sonu1@gmail.com",
      "password": "arpit",
      "role": "admin"
    })
    const response = await request
      .post('/users/signin')
      .send({
        "email": "sonu1@gmail.com",
        "password": "arpit",
      })
    // assert that the response contains a token
    expect(response.body.data).toHaveProperty('access_token');
    expect(typeof response.body.data.access_token).toBe('string');
    expect(response.body.data).toHaveProperty('refresh_token');
    expect(typeof response.body.data.refresh_token).toBe('string');
  });



  it('should return an error if email is invalid', async () => {
    // sign in with invalid email
    const res = await request
      .post('/users/signin')
      .send({
        email: 'invalid_email@gmail.com',
        password: user.password
      })

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual(expect.objectContaining({
      key: 'NotFound',
      code: 404,
      message: 'User not found.',
    }));
  });

  it('should return an error if password is invalid', async () => {
    // sign in with invalid email
    const res = await request
      .post('/users/signin')
      .send({
        email: user.email,
        password: 'user.password'
      })
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual(expect.objectContaining({
      key: 'NotFound',
      code: 404,
      message: 'User not found.',
    }));
  });

  it('should return a updated access token based on refresh token', async () => {
    const newUser = await createUser({
      "first_name": "Arpit",
      "last_name": "Yadav",
      "gender": "male",
      "email": "sonu12@gmail.com",
      "password": "arpit",
      "role": "admin"
    })
    const response = await request
      .post('/users/update-token')
      .send({}).set({ refresh_token: newUser.body.data.refresh_token })
    // assert that the response contains a token
    expect(response.body.data).toHaveProperty('access_token');
    expect(typeof response.body.data.access_token).toBe('string');
  });
})