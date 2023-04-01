// import app from '../src/app';
// import * as request from 'supertest';
// import 'jest-extended';
// jest.useFakeTimers();

// const headers = {
//   'user-id': 1,
// };

// beforeEach(async () => {
//   jest.useFakeTimers();
// });

// const baseUrl = '/';
// describe(`GET ${baseUrl} - Get All`, () => {
//   it('Hello API Request', async () => {
//     const response = await request(app).get(baseUrl).set(headers);

//     expect(response.status).toEqual(200);
//     expect(response.body).toHaveProperty('data');
//     expect(response.body).toBeObject();
//     expect(response.body.data).toHaveProperty('message', 'Welcome');
//   });
// });
it('tt', () => {
  let obj = { a: '1' };
  expect(obj).toEqual({ a: '1' });
});
