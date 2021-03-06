/**
 * @swagger
 * resourcePath: /users
 * description: All about API
 */
const express = require('express');
const router = express.Router();
let user = require('./users.controller');
let report = require('../reports/reports.controller');
let authController = require('../auth/auth.controller');
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
router.get('/:userId', authController.authenticate, user.getUser);

router.post('/', user.createUser);

router.put('/:userId', authController.authenticate, authController.authById, user.updateUser);

router.delete('/:userId', authController.authenticate, user.deleteUser);

router.get('/:userId/reports', authController.authenticate, report.getReportsByUserId);

module.exports = router;