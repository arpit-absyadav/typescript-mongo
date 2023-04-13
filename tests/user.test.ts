import 'jest-extended';
import app, { App } from '../src/app';
import * as request from 'supertest';
// import { UserService } from '../src/modules/users/user.service';
// import { User } from '../src/modules/users/user.model';
// import { MongooseManager } from '../src/common/managers/mongoose.manager';
// import { IUser } from '../src/modules/users/interfaces/user.interface';
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
// const userService = new UserService();
const baseUrl = '/';
describe(`GET ${baseUrl} - Get All`,  () => {
  beforeAll(async () => {
    // Wait for the database connection before running any tests
  //  const a = new MongooseManager()
  // await a.init()
  console.log('Before all');
  
  const newApp = new App();
  await newApp.getMongooseManger().init()
  // await new Promise(resolve => setTimeout(resolve, 5000));
 console.log('before all end');
 
  });
  it('Hello API Request', async () => {
    const response = await request(app).get(baseUrl).set(headers);

    expect(response.status).toEqual(200);
    // expect(response.body).toHaveProperty('data');
    // expect(response.body).();
    // expect(response.body.data).toHaveProperty('message', 'Welcome');
  });
  it('Hello API Request Signup', async () => {
    const data = {
      "first_name": "Arpit Update",
     "last_name": "yadav",
     "gender": "male",
     "email": "sonu@gmail.com",
     "password": "arpit",
     "role": "admin"
 }
    const response = await request(app).post(`${baseUrl}users/signup`).set(headers).send(data);

console.log(response)
    expect(response.status).toEqual(200);
    // expect(response.body).();
    // expect(response.body.data).toHaveProperty('message', 'Welcome');
  });
});

// describe('MongooseManager', () => {
//   beforeAll(async () => {
//     // Wait for the database connection before running any tests
//     await MongooseManager.getInstance();
//   });

//   it('should be able to create a new user', async () => {
//     const newUser = new User({
//       "first_name": "John Doe",
//      "last_name": "yadav",
//      "gender": "male",
//      "email": "johndoe@example.com",
//      "password": "arpit",
//      "role": "admin"
//     });
//     await newUser.save();
//     const savedUser = await User.findOne({ email: 'johndoe@example.com' });
//     expect(savedUser?.first_name).toEqual('John Doe');
//   });
// });
