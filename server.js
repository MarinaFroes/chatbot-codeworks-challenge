// Reference: https://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server

const connect = require('connect');
const serveStatic = require('serve-static');

connect()
  .use(serveStatic(__dirname))
  .listen(8080, () => console.log('Server running on 8080...'));