const Comment = require('./comments.model');
const User = require('./../users/users.model');

exports.createComment = function (req, res, next) {
    let body = req.body;
    if(body.isAnonymous === true){
        newComment = new Comment(body);
        newComment.save((err, comment) => {
            if (err)
              next(err);
            res.status(201).json(comment);
          }); 
    } else {
        User.findById(body.userId, (err, user) => {
            if (user){
                newComment = new Comment(body);
                newComment.save((err, comment) => {
                  if (err)
                    next(err);
                  res.status(201).json(comment);
                }); 
            } else {
                res.status(404).json({message: 'User not found.'});
            }
        }); 
    }
};

exports.updateComment = function (req, res, next) {
    let body = req.body;
    let params = req.params;
    Comment.findByIdAndUpdate(params.commentId, body, {new: false}, (err, comment) => {
        if (err)
            next(err);
        res.status(200).json(comment);
    });
};

exports.getComment = function (req, res, next) {
    let params = req.params;

    Comment.findById(params.commentId, (err, comment) => {
        if (err)
            next(err);
        res.status(200).json(comment);
    });
};

exports.deleteComment = function(req, res, next) {
    let params = req.params;

    Comment.findByIdAndDelete(params.commentId, (err, comment) => {
        if (err)
            next(err);
        res.status(200).json({message: "comment deleted."});
      });
};

exports.getCommentsByReportId = function(req, res, next) {
    let params = req.params;

    Comment.find({reportId: params.reportId}, (err, comments) => {
        if(err)
            next(err);
        a = []
        if(comments.length > 0){
            comments.forEach(function(comment){
                if (comment.isAnonymous == true){
                    a.push(comment);
                } else {
                    User.findById(comment.userId, (err, user)=>{
                        if (err)
                            next(err)
                        u = {name: user.name, photo: user.photoUrl};
                        newInfo = {
                            isAnonymous: comment.isAnonymous,
                            _id: comment._id,
                            content: comment.content,
                            userId: comment.userId,
                            createdDate: comment.createdDate,
                            user: u};
                        a.push(newInfo);
    
                        if (comments.length === a.length){
                            res.status(200).json({comments: a});
                        }
                    });
                }
            });
        } else{
            res.status(200).json({comments: a});
        }
    });
};