require('dotenv').config();

const Server = require('./models/server')
const server = new Server();
 
//inicializa el servidor
server.listen();