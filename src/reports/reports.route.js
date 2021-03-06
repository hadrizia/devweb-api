const express = require('express');
const router = express.Router();
let report = require('./reports.controller');
let comment = require('../comments/comments.controller');
let authController = require('../auth/auth.controller');

router.get('/:reportId', authController.authenticate, report.getReport);

router.post('/', report.createReport);

router.put('/:reportId', authController.authenticate, report.updateReport);

router.delete('/:reportId', authController.authenticate, report.deleteReport);

router.get('/:reportId/comments', authController.authenticate, comment.getCommentsByReportId);

router.post('/:reportId/addLike', report.addLike);

router.post('/:reportId/addDislike', report.addDislike);

router.get('/', report.getReports);

module.exports = router;