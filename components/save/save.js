const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.log("Error " + err);
});

exports.savePlayer = (player) => {
    return new Promise((resolve,reject) => {
        client.hmset(player.name, player, (err, reply) => {
            if (err)
                return reject(err)
            else {
                resolve(reply);
            }
        })
    })
}
