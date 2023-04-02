// jest.useFakeTimers();

// import app from '../../../app';
// import * as request from 'supertest';

// const headers = {
//   'user-id': 1,
// };

// beforeEach(() => {
//   jest.useFakeTimers();
// });

// const baseUrl = '/users';
// describe(`GET ${baseUrl} - Get All`, () => {
//   it('Hello API Request', async () => {
//     const result = await request(app).get(baseUrl).set(headers);
//     console.log('result.body', result.body);

//     expect(result.status).toEqual(200);
//     // expect(result.body).toHaveProperty('message', 'Welcome');
//   });
// });

it('tt', () => {
  let obj = { a: '1' };
  expect(obj).toEqual({ a: '1' });
});
