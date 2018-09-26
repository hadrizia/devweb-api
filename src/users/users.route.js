/**
 * @swagger
 * resourcePath: /users
 * description: All about API
 */
const express = require('express');
const router = express.Router();
let user = require('./users.controller')
let report = require('../reports/reports.controller')

/**
 * @swagger
 * path: /users
 * operations:
 *   -  httpMethod: GET
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      responseClass: User
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: username
 *          description: Your username
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Your password
 *          paramType: query
 *          required: true
 *          dataType: string
 */
router.get('/:userId', user.getUser);

router.post('/', user.createUser);

router.post('/login', user.login);

router.put('/:userId', user.updateUser);

router.delete('/:userId', user.deleteUser);

router.get('/:userId/reports', report.getReportsByUserId);

module.exports = router;