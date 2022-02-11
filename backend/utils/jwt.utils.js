let jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = {
    generateToken: function(userData){
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin,
        },
        TOKEN_SECRET,
        {
            expiresIn:'48h'
        })
    }
}