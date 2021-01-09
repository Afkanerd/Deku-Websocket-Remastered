const net = require('net');
const port = 3000

const info = {
    uuid: "",
    name: "",
    token: ""
}

var client = net.connect({
    port: port
}, () => {
    console.log('Connected to server');
})

client.write(JSON.stringify(info));

client.on('end', () => {
    console.log('Disconnected from Server');
})