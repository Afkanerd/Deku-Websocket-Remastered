const assert = require("chai").assert;
const {
    Sequelize,
    QueryTypes
} = require("sequelize");
const cred = require("../credentials.json");
const SMS = require('../models/sms.js');
var sms = new SMS();

// create connection : new Sequelize(database, username, password, {host, dialect})
const sequelize = new Sequelize(cred.DATABASE, cred.USERNAME, cred.PASSWORD, {
    host: cred.HOST,
    dialect: "mysql"
});

describe('SMS unit test', () => {
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
})