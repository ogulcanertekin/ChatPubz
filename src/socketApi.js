const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');

const io = socketio();

const socketApi = {
    io:io
};

//Socket authorization middleware
io.use(socketAuthorization);

// Redis Adapter

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));

io.on('connection',socket=>{
    console.log('a user logged in with name'+socket.request.user.name);         //Getting Data From session
});

module.exports = socketApi;