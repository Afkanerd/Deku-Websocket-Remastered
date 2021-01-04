const {
    Sequelize,
    DataTypes,
    UUIDV4
} = require("sequelize");
const cred = require("../credentials.json")

// create connection : new Sequelize(database, username, password, {host, dialect})
const sequelize = new Sequelize(cred.DATABASE, cred.USERNAME, cred.PASSWORD, {
    host: cred.HOST,
    dialect: "mysql"
});

const user = sequelize.define("User", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: DataTypes.STRING,
    token: DataTypes.STRING
})

/**
 * Class representing a user
 */
class Users {
    /**
     * create a new user
     * @param {STRING} name first and last name
     * @param {STRING} token generated token
     * @returns {Promise} an Object {uuid: STRING, name: STRING}
     */
    create(name, token) {
        return new Promise(async (resolve, reject) => {
            try {
                await user.sync();
                var newUser = await user.create({
                    name: name,
                    token: token
                })
                resolve({
                    uuid: newUser.uuid,
                    name: newUser.name
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = Users