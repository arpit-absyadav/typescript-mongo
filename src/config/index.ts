import 'dotenv/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  ENVIRONMENT: process.env.ENVIRONMENT || 'DEVELOPMENT',
  MICROSERVICE_NAME: process.env.MICROSERVICE_NAME || 'USERS',
  MICROSERVICE_IP: process.env.MICROSERVICE_IP || '0.0.0.0',
  SERVICE_HOST: process.env.SERVICE_HOST || '0.0.0.0',
  SERVICE_PORT: process.env.SERVICE_PORT || '8000',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_USERNAME: process.env.MONGO_USERNAME || 'root',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'root',
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'pbnpa',
  API_VERSION: 'v1',
};

console.log(config);
