const assert = require("chai").assert;
const {
    Sequelize,
    QueryTypes
} = require("sequelize");
const cred = require("../credentials.json")

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