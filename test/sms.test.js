const assert = require("chai").assert;
const SMS = require('../models/sms.js');
var sms = new SMS();

describe('SMS unit test', () => {

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