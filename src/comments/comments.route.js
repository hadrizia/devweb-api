const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send(JSON.stringify(
            [
                {
                    id: 1,
                    report_id: '1',
                    date: '02/03/2018',
                    content: 'laklkbdabdkhebkbda',
                    is_anonymous: true
                },
                {
                    id: 2,
                    report_id: '2',
                    date: '03/02/2018',
                    content: 'laklkbdabdkhebkbda',
                    id_author: '1',
                    is_anonymous: false
                }
            ]
        ));
});

// TODO: investigar pq nao esta pegando
router.get('/:id', function(req, res) {
    console.log(req.params.id);
    res.send(JSON.stringify(
            {
                id: 1,
                report_id: '1',
                date: '02/03/2018',
                content: 'laklkbdabdkhebkbda',
                is_anonymous: true
            }
        ));
});

router.post('/', function(req, res) {
    res.send(JSON.stringify(
        {
            id: 3,
            report_id: '1',
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
            report_id: '1',
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
            sucess: true
        }
    ));
});

module.exports = router;