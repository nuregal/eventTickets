const bcrypt = require("bcrypt");
const database = require("../model/db");
const jwt = require("jsonwebtoken");


exports.loggedIn = function (request, response) {
    let result = {loggedIn: true};
    
    response.json(result);
}

exports.login = async function (request, response) {
    const credentials = request.body;

    let result = {
        success: false
    };

    const staff = await checkCredentials(credentials);
    if (staff) {
        const user = database.get("staff").find({
            username: credentials.username
        }).value();

        const token = jwt.sign({
            id: user.id
        }, process.env.SECRET_TOKEN, {
            expiresIn: "120s"
        });

        result.success = true;
        result.token = token;
    }

    response.json(result);

    // Operations
    async function checkCredentials(credentials) {
        const staff = database.get("staff").find({
            username: credentials.username
        }).value();
        if (staff) {
            return await comparePassword(credentials.password, staff.password);
        } else {
            return false;
        }
    }

    async function comparePassword(password, hash) {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}

exports.verify = function (request, response) {
    const {
        id
    } = request.body;

    const staffId = request.user.id;

    const staff = database.get('staff').find({
        id: staffId
    }).value();

    let result = {
        success: false
    };

    if (staff) {
        const ticket = database.get("tickets").find({
            id: id
        }).value();
        if (ticket) {
            result.success = true;
            database.get("tickets").remove({
                id: id
            }).write();
        }
    }

    response.json(result);
}