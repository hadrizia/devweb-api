const express = require('express');
const router = express.Router();
let comment = require('./comments.controller');
let authController = require('../auth/auth.controller');

router.get('/:commentId', authController.authenticate, comment.getComment);

router.post('/', authController.authenticate, comment.createComment);

router.put('/:commentId', authController.authenticate, comment.updateComment);

router.delete('/:commentId', authController.authenticate, comment.deleteComment);

module.exports = router;