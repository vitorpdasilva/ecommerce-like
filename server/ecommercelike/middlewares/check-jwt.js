const jwt = require('jsonwebtoken');
const config = require('../config');

modules.export = function(req, res, next) {
    let token = req.headers['authorization'];

    if(token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if(err) {
                res.json({
                    success: false,
                    message: "failed to auth token"
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        rest.status(403).json({
            success: false,
            message: "no token provided"
        })
    }
}