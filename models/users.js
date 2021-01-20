const {
    Sequelize,
    DataTypes,
    UUIDV4
} = require("sequelize");
require("dotenv").config()

// create connection : new Sequelize(database, username, password, {host, dialect})
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
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
     * authenticate user
     * @param {STRING} uuid 
     * @returns {Promise} Object {valid: BOOLEAN(true if found, false if not found)}
     */
    auth(uuid) {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await this.find(uuid);
                if (result.length < 1) {
                    resolve({
                        valid: false
                    })
                }
                resolve({
                    valid: true
                })
            } catch (e) {
                reject(e)
            }
        })
    }
    /**
     * create a new user
     * @param {STRING} name first and last name
     * @param {STRING} token generated token
     * @returns {Promise} Object {uuid: STRING, name: STRING}
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

    /**
     * find a user by uuid
     * @param {STRING} uuid 
     * @returns {Promise} Object {uuid, name}
     */
    find(uuid) {
        return new Promise(async (resolve, reject) => {
            try {
                await user.sync();
                var found = await user.findAll({
                    where: {
                        uuid: uuid
                    },
                    raw: true
                })
                if (found.length < 1) {
                    resolve([])
                }
                resolve({
                    uuid: found[0].uuid,
                    name: found[0].name
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}

(async () => {
    var inuser = new Users()
    var name = "John Doe";
    var token = "11ee";
    var uuid = "01427117-7977-400b-bc31-978817e8cd8c"
    var found = await inuser.auth(uuid);
    console.log(found)
})();

module.exports = Users