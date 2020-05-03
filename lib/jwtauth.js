const jwt = require('jsonwebtoken')

export default function jwtauth(req) {
    const authed = req.headers.authorization;
    if (authed) {
        const token = req.headers.authorization.replace('Bearer ', '');
        try {
            return jwt.verify(token, process.env.secret);
        }catch(err){
            return false
        }
    } else return false
}