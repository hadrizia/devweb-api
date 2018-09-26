const express = require('express');
const router = express.Router();
let comment = require('./comments.controller');

router.get('/:commentId', comment.getComment);

router.post('/', comment.createComment);

router.put('/:commentId', comment.updateComment);

router.delete('/:commentId', comment.deleteComment);

module.exports = router;