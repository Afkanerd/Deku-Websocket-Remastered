const {
    Sequelize,
    DataTypes
} = require("sequelize");
require("dotenv").config()

// create connection : new Sequelize(database, username, password, {host, dialect})
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});

const sms = sequelize.define("SMS", {
    sender: DataTypes.STRING,
    reciever: DataTypes.STRING,
    number: DataTypes.INTEGER,
    body: DataTypes.STRING,
    status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING"
    }
})

/**
 * Class representing an sms
 */
class SMS {
    /**
     * create a new user
     * @param {STRING} sender senders name
     * @param {STRING} reciever recievers name
     * @param {NUMBER} number recievers number
     * @param {STRING} body message to send
     * @returns {Promise} Object {sender: STRING, reciever: STRING, number: NUMBER, body: STRING, status: STRING}
     */
    create(sender, reciever, number, body) {
        return new Promise(async (resolve, reject) => {
            try {
                await sms.sync();
                var newSms = await sms.create({
                    sender: sender,
                    reciever: reciever,
                    number: number,
                    body: body
                })
                resolve({
                    sender: newSms.sender,
                    reciever: newSms.reciever,
                    number: newSms.number,
                    body: newSms.body,
                    status: newSms.status
                })
            } catch (e) {
                reject(e)
            }
        })
    }

}

// (async () => {
//     var test = {
//         sender: "John Doe",
//         reciever: "Peter Head",
//         number: 670918263,
//         body: "hello world test sms"
//     }

//     var inSms = new SMS()
//     var result = await inSms.create(test.sender, test.reciever, test.number, test.body);
//     console.log(result)
// })();

module.exports = SMS