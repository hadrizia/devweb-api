/**
 * @swagger
 * resourcePath: /users
 * description: All about API
 */
const express = require('express');
const router = express.Router();

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
router.get('/', function(req, res) {
    res.send(JSON.stringify(
        [
            {
                id: 1,
                name: 'Hadrizia Santos',
                photo: 'default'
            },
            {
                id: 2,
                name: 'Marianne Linhares',
                photo: 'default'
            }
        ]
    ));
});

router.post('/', function(req, res) {
    res.send(JSON.stringify(
        {
            id: 3,
            name: 'Jade CatLady',
            photo: 'default'
        }
    ));
});

router.post('/login', function(req, res) {
    res.send(JSON.stringify(
        {
            id: 3,
            name: 'Jade CatLady',
            photo: 'default'
        }
    ));
});

router.put('/', function(req, res) {
    res.send(JSON.stringify(
        {
            id: 3,
            name: 'Jade CatLady edited',
            photo: 'default'
        }
    ));
});

router.delete('/', function(req, res) {
    res.send(JSON.stringify(
        {
            sucess: true
        }
    ));
});

module.exports = router;