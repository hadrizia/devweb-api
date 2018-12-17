const Report = require('./reports.model');
const Comment = require('../comments/comments.model');
const User = require('../users/users.model');
var _        = require('underscore');


exports.createReport = function (req, res, next) {
    let body = req.body;
    if(body.isAnonymous === true){
        newReport = new Report(body);
        newReport.save((err, report) => {
            if (err)
              next(err);
            res.status(201).json(report);
          }); 
    } else {
        User.findById(body.userId, (err, user) => {
            if (user){
                newReport = new Report(body);
                console.log(newReport);
                newReport.save((err, report) => {
                  if (err)
                    next(err);
                  res.status(201).json(report);
                }); 
            } else {
                res.status(404).json({message: 'User not found.'});
            }
        }); 
    }
};

exports.updateReport = function (req, res, next) {
    let body = req.body;
    let params = req.params;

    Report.findByIdAndUpdate(params.reportId, {content: body.content}, {new: false}, (err, report) => {
        if (err)
            next(err);            
        res.status(404).json({message: 'User not found.'});
    });    
};

exports.getReport = function (req, res, next) {
    let params = req.params;

    Report.findById(params.reportId, (err, report) => {
        if (err)
            next(err);
            res.status(201).json(report);
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
        a = []
        reports.forEach(function(report){
            if (report.isAnonymous == true){
                a.push(report);
            } else {
                User.findById(report.userId, (err, user)=>{
                    if (err)
                        next(err)
                    u = {name: user.name, photo: user.photoUrl};
                    newInfo = {
                        isAnonymous: report.isAnonymous ,
                        numLikes: report.numLikes,
                        numDislikes: report.numDislikes,
                        _id: report._id,
                        content: report.content,
                        userId: report.userId,
                        createdDate: report.createdDate,
                        user: u};
                    a.push(newInfo);

                    if (reports.length === a.length){
                        res.status(200).json({reports: a});
                    }
                });
            }
        });        
    });
};