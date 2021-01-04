const assert = require("chai").assert;
const {
    Sequelize,
    QueryTypes
} = require("sequelize");
const cred = require("../credentials.json");
const Users = require("../models/users.js");
var user = new Users();

// create connection : new Sequelize(database, username, password, {host, dialect})
const sequelize = new Sequelize(cred.DATABASE, cred.USERNAME, cred.PASSWORD, {
    host: cred.HOST,
    dialect: "mysql"
});

describe('Database Connection', () => {
    var result

    before(async () => {
        result = await sequelize.query("SELECT 1+1 AS sum", {
            type: QueryTypes.SELECT
        });
    })

    it("should connect", (done) => {
        assert.equal(result[0].sum, 2)
        done();
    })
})

describe('Users model', () => {
    var newUser;
    var name;
    var token;
    var found;

    before(async () => {
        name = "John Doe";
        token = "11ee";
        newUser = await user.create(name, token);
        found = await user.find(newUser.uuid)
    })

    it("Create a new user", (done) => {
        assert.property(newUser, "uuid");
        assert.property(newUser, "name")
        done();
    })

    it("Find user by UUID", (done) => {
        assert.equal(found.uuid, newUser.uuid);
        assert.equal(found.name, newUser.name);

        done();
    })
})