const assert = require("chai").assert;
const {
    Sequelize,
    QueryTypes
} = require("sequelize");
const cred = require("../credentials.json");
const Users = require("../models/users.js");
const SMS = require('../models/sms.js');
var user = new Users();
var sms = new SMS();

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
    var found;
    var holder = {
        name: "John Doe",
        token: "11ee"
    }

    before(async () => {
        newUser = await user.create(holder.name, holder.token);
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

describe('SMS model', () => {
    var result;
    var test = {
        sender: "John Doe",
        reciever: "Peter2 Head",
        number: 670918263,
        body: "hello world test sms"
    }

    before(async () => {
        result = await sms.create(test.sender, test.reciever, test.number, test.body);
    })

    it("Create a new SMS", (done) => {
        assert.property(result, "sender");
        assert.property(result, "reciever");
        assert.property(result, "number");
        assert.property(result, "body");
        assert.property(result, "status");
        done();
    })

})