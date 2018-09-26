const express = require('express');
const router = express.Router();
let report = require('./reports.controller')
let comment = require('../comments/comments.controller')

router.get('/:reportId', report.getReport);

router.post('/', report.createReport);

router.put('/:reportId', report.updateReport);

router.delete('/:reportId', report.deleteReport);

router.get('/:reportId/comments', comment.getCommentsByReportId);

module.exports = router;