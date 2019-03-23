const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');

const io = socketio();

const socketApi = {
    io:io
};

//libs

const Users = require('./lib/Users');

//Socket authorization middleware
io.use(socketAuthorization);

// Redis Adapter

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));

io.on('connection',socket=>{
    console.log('a user logged in with name'+socket.request.user.name);         // Take Data from Redis Session!

    Users.upsert(socket.id, socket.request.user);                               //lib-->User-->Upsert User Data to Redis when User Connected                         

    Users.list((users)=>{                                                       //Returns  Users Array!
        io.emit('onlineList',users);                                             
    });

    socket.on('disconnect',()=>{                                               //Disconnect --> Delete User from Redis in  'Online' Key
        Users.remove(socket.request.user._id); 
        
        Users.list((users)=>{                                                   
            io.emit('onlineList',users);                                             
        });
    });

});

module.exports = socketApi;