var jwt = require('jsonwebtoken');

const SECRET_STRING = 'This_is_my_secret_string';

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send("Please authenticate using a valid token");
    }
    try {
        const data = jwt.verify(token, SECRET_STRING);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Please authenticate using a valid token");
    }
}

module.exports = fetchUser;