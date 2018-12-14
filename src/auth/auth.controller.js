const jwt = require('jsonwebtoken');
const userController = require('../users/users.controller');
const config = require('../../config/config');

exports.login = function(req, res, next){
    let body = req.body;

    let userEmail = body.email;
    let userPassword = body.password;

    userController.getUserByEmail(userEmail)
        .then((user) => {

            if(!user) {
                return res.json({message:'Usuário não encontrado.' });
            } else if(user) {
                if(userEmail === user.email && userPassword === user.password) {
                    let token = jwt.sign({
                        _id: user._id,
                        email: user.email,
                    },  config.jwtSecret);
                    return res.json({ userId: user._id, token });
                } else {
                    return res.json({message:'Failed. Wrong password.'});
                }
            }
        })
        .catch((err) => {
            console.log(err);
            let error = {' message':'Something went wrong, try again. ', 'error': err.message };
            return res.json(error);
        });
}

exports.authenticate = function(req, res, next){
    let token = undefined;
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(" ")[1];
    } else {
        token = req.body.token;
    }
    if(token) {
        try {
            const data = (module.exports.decodeToken(token));
            if(data) {
                req._id = data._id;
                req.email = data.email;
                next();
            } else {
                return res.json({ 'message':'Failed to decode. Wrong token.' });
            }
        } catch (error) {
            console.log(error);
            return res.json({ 'message':'Something went wrong, try again.', 'error': error.message });
        }
    } else {
        return res.json({ 'message':'Failed to authenticate. Unreachable token.' });
    }
};

exports.authById = function(req, res, next){
    const userId = req._id;
    if (userId) {
        const reqId = req.params.userId;
        if (userId == reqId) {
            next();
        } else {
            return res.json({ 'message':'Failed. Unauthorized user.' });
        }
    } else {
        return res.json({ 'message':'Something went wrong, try again.' });
    }
};

exports.decodeToken = function(token) {
    return jwt.verify(token, config.jwtSecret);
};