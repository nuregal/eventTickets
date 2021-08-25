const database = require('../model/db')
const jwt = require('jsonwebtoken');

function staff(request, response, next) {
    try {
        const token = request.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = database.get('staff').find({id: data.id}).value();
        

        if (!user) {
            throw new Error();
        } else {
            request.user = user;
            next()
        }
    } catch (error) {
        console.log(error)
        response.status(401).json({success: false,message: 'Unauthorized'});
    }
}

module.exports = staff;