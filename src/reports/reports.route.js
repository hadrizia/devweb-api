const express = require('express');
const router = express.Router();
let report = require('./reports.controller');
let comment = require('../comments/comments.controller');
let authController = require('../users/auth.controller');

router.get('/:reportId', authController.checkAuthentication, report.getReport);

router.post('/', authController.checkAuthentication, report.createReport);

router.put('/:reportId', authController.checkAuthentication, report.updateReport);

router.delete('/:reportId', authController.checkAuthentication, report.deleteReport);

router.get('/:reportId/comments', authController.checkAuthentication, comment.getCommentsByReportId);

module.exports = router;