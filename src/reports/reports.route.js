const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send(JSON.stringify(
            [
                {
                    id: 1,
                    local: 'Parque do Povo',
                    date: '02/03/2018',
                    content: 'laklkbdabdkhebkbda',
                    is_anonymous: true
                },
                {
                    id: 2,
                    local: 'UFCG',
                    date: '03/02/2018',
                    content: 'laklkbdabdkhebkbda',
                    id_author: '1',
                    is_anonymous: false
                }
            ]
        ));
});

router.post('/', function(req, res) {
    res.send(JSON.stringify(
        {
            id: 3,
            local: 'Parque da Criança',
            date: '02/03/2017',
            content: 'laklkbdabdkhebkbdaajdakjdbdsajkdajkbd',
            id_author: '2',
            is_anonymous: false
        }
    ));
});

router.put('/', function(req, res) {
    res.send(JSON.stringify(
        {
            id: 3,
            local: 'Parque da Criança editado',
            date: '02/03/2017',
            content: 'laklkbdabdkhebkbdaajdakjdbdsajkdajkbd',
            id_author: '2',
            is_anonymous: false
        }
    ));
});

router.delete('/', function(req, res) {
    res.send(JSON.stringify(
        {
            id: 3,
            local: 'Parque da Criança deleted',
            date: '02/03/2017',
            content: 'laklkbdabdkhebkbdaajdakjdbdsajkdajkbd',
            id_author: '2',
            is_anonymous: false
        }
    ));
});

module.exports = router;