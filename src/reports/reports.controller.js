const Report = require('./reports.model');
const Comment = require('../comments/comments.model');
const User = require('../users/users.model');
var _        = require('underscore');


exports.createReport = function (req, res, next) {
    let body = req.body;
    User.findById(body.userId, (err, user) => {
        if (user){
            body.user = {_id: user._id, name: user.name, username: user.username, photo: user.photoUrl};
            newReport = new Report(_.omit(body, 'userId'));
            newReport.save((err, report) => {
              if (err)
                next(err);
              res.status(201).json(report);
            }); 
        } else {
            res.status(404).json({message: 'User not found.'});
        }
    });    
};

exports.updateReport = function (req, res, next) {
    let body = req.body;
    let params = req.params;
    Report.findByIdAndUpdate(params.reportId, body, {new: false}, (err, report) => {
        if (err)
            next(err);
        res.status(200).json(report);
});
};

exports.getReport = function (req, res, next) {
    let params = req.params;

    Report.findById(params.reportId, (err, report) => {
        if (err)
            next(err);
        res.status(200).json(report);
    });
};

exports.getReportsByUserId = function (req, res, next) {
    let params = req.params;

    Report.find({userId: params.userId}, (err, reports) => {
        if (err)
            next(err);
        res.status(200).json(reports);
    });
};

exports.deleteReport = function(req, res, next) {
    let body = req.body;
    let params = req.params;

    Comment.deleteMany({reportId: params.reportId}, (err, comments) =>{
        if (err)
            next(err);
        Report.findByIdAndDelete(params.reportId, (err, report) => {
            if (err)
                next(err);
            res.status(200).json({message: "report deleted."});
        });
    });
};

exports.addLike = function(req, res, next){
    let params = req.params;

    Report.findById(params.reportId, (err, report) => {
        if (err)
            next(err);
        report.numLikes = report.numLikes + 1;
        report.save((err, report) => {
            if (err)
              next(err);
            res.status(200).json(report);
          });
    });
};

exports.addDislike = function(req, res, next) {
    let params = req.params;

    Report.findById(params.reportId, (err, report) => {
        if (err)
            next(err);
        report.numDislikes = report.numDislikes + 1;
        report.save((err, report) => {
            if (err)
              next(err);
            res.status(200).json(report);
          });
    });
};

exports.getReports = function(req, res, next){
    Report.find({}, (err, reports) => {
        if (err)
            next(err);
        res.status(200).json({reports: reports});
    });
};