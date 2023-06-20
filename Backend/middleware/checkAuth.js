const jwt = require('jsonwebtoken');



const authenticate = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }


    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'

        if(!token) {
          return res.status(403).json({message: 'Authentication failed!'})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_Password);
        req.userData = { userId: decodedToken.userId };

        next();
    } catch (err) {
        return res.status(403).json({message: 'Authentication failed!'})
    }
};

module.exports = authenticate;