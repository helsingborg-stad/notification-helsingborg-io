/*
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
*/

const axios = require('axios');
const soap = require('soap');


exports.getPerson = (url, headers, xml, id) => {
    return new Promise((resolve,reject) => {
        console.log("url, headers, xml, id")
        console.log(url)
        console.log(headers)
        console.log(xml)
        console.log(id)
        resolve ({name: "kalle"})
        let reply = {name: "hej"}
        if (err)
                return reject(err)
            else {
                resolve(reply);
            }
        /*
        axios({
            method: 'post',
            url,
            headers,
            data: xml
        }).then((response) => {
            resolve({
                response: {
                    body: response.data,
                    statusCode: response.status,
                }
            })
        }).catch((error) => {
            reject(error)
        })
        */
    })
}
/*
possible solution
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: fs.readFileSync("./usercert.pem"),
    key: fs.readFileSync("./key.pem"),
    passphrase: "YYY"
  })
  
  axios.get(url, { httpsAgent })

  const instance = axios.create({ httpsAgent })

  */