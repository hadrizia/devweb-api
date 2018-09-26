const User = require('./users.model')
const Report = require('../reports/reports.model')
const Comment = require('../comments/comments.model')

exports.createUser = function (req, res, next) {
    let body = req.body;
    const newUser = new User(body);
    newUser.save((err, user) => {
      if (err)
        next(err);
      res.status(201).json(user);
    });
};

exports.updateUser = function (req, res, next) {
    let body = req.body;
    let params = req.params;
    User.findByIdAndUpdate(params.userId, body, {new: false}, (err, user) => {
        if (err)
            next(err);
        res.status(200).json(user);
    });
};

exports.getUser = function (req, res, next) {
    let body = req.body;
    let params = req.params;

    User.findById(params.userId, (err, user) => {
        if (err)
            next(err);
        res.status(200).json(user);
    });
};

exports.deleteUser = function(req, res, next) {
    let params = req.params;
    Report.deleteMany({userId: params.userId}, (err, reports => {
        if (err)
            next(err);
        reports.forEach(report => {
            Comment.deleteMany({reportId: report.id}, (err, comments) => {
                if(err)
                    next(err);
                });
            });
        User.findByIdAndDelete(params.userId, (err, user) => {
            if (err)
                next(err);
            res.status(200).json({message: "user deleted."});
        });
    }));
};

exports.login = function(req, res, next) {
    let body = req.body;
    User.findOne({email: body.email, password: body.password}, (err, user) => {
        if (err)
            next(err);
        res.status(200).json(user);
    });
};