const assert = require("chai").assert;
const Users = require("../models/users.js");
var user = new Users();

describe('User Unit test', () => {

    describe('Users model', () => {
        var newUser;
        var found;
        var auth;
        var holder = {
            name: "John Doe",
            token: "11ee"
        }

        before(async () => {
            newUser = await user.create(holder.name, holder.token);
            found = await user.find(newUser.uuid)
            auth = await user.auth(newUser.uuid)
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

        it("Authenticate user by UUID", (done) => {
            assert.equal(auth.valid, true);

            done();
        })
    })
})