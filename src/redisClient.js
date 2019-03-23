const redisClient = require('redis');

const getClient = () =>{                                
    return redisClient.createClient({
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    });
};

module.exports.getClient = getClient;