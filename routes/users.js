const express = require('express');
const router = express.Router();

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