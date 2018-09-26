const Comment = require('./comments.model')

exports.createComment = function (req, res, next) {
    let body = req.body;
    const newComment = new Comment(body);
    newComment.save((err, comment) => {
      if (err)
        next(err);
      res.status(201).json(comment);
    });
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
            res.status(200).json(comments);
    });
};