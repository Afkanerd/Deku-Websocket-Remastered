const net = require('net');
const Users = require("./models/users.js")
const port = 3000;

const user = new Users();

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

            // incoming data from client
            connection.on("data", async (data) => {
                let info = JSON.parse(data);
                let result = await user.auth(info.uuid);

                if (result.valid == false) {
                    connection.end("Access denied")
                } else {
                    connection.write('Welcome ' + info.name)
                }
            })

            connection.on('end', () => {
                console.log('A client disconnected')
            })
        })
    } catch (err) {
        throw err
    }
})();