import App from './app';

const port = +process.env.SERVICE_PORT || 3000;
const host = process.env.SERVICE_HOST || '0.0.0.0';
App.listen(port, host, () => {
  console.info(`App is running on http://${host}:${port}`);
});
