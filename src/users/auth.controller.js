var passport = require('passport');

exports.login = function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      req.login(user, (err) => {
        return res.send('You were authenticated & logged in!\n');
      });
    })(req, res, next);
}

exports.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(403).send('Por favor faça login para acessar esta página.');
    }
}