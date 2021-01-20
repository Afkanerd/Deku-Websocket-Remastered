const net = require('net');
const port = 3000
const SMS = require("../models/sms.js")

const sms = new SMS();

const info = {
    uuid: "01427117-7977-400b-bc31-978817e8cd8c",
    name: "John Doe",
    token: "1123"
}

var client = net.connect({
    port: port
}, () => {
    console.log('Connected to server');
})

// send data to server
client.write(JSON.stringify(info));

// incoming data from server
client.on('data', (data) => {
    console.log(data.toString())
})

client.on('end', () => {
    console.log('Disconnected from Server');
})