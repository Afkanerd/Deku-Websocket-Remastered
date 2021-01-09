const net = require('net');
const port = 3000;

function createServerConnection() {
    return new Promise((resolve, reject) => {
        try {
            let server = net.createServer();

            server.listen(port, console.log('Server listening on port ' + port))
            resolve(server)
        } catch (err) {
            reject(err)
        }
    })
}

(async () => {
    try {
        let serverConnection = await createServerConnection();

        serverConnection.on('connection', (connection) => {
            console.log('A client connected');

            connection.on("data", (data) => {
                console.log(JSON.parse(data))
            })

            connection.on('end', () => {
                console.log('A client disconnected')
            })
        })
    } catch (err) {
        throw err
    }
})();