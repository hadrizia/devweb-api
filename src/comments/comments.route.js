const express = require('express');
const router = express.Router();
let comment = require('./comments.controller');
let authController = require('../users/auth.controller');

router.get('/:commentId', authController.checkAuthentication, comment.getComment);

router.post('/', authController.checkAuthentication, comment.createComment);

router.put('/:commentId', authController.checkAuthentication, comment.updateComment);

router.delete('/:commentId', authController.checkAuthentication, comment.deleteComment);

module.exports = router;