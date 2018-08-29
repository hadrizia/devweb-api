const express = require('express');
const app = express();

router.get('/', function(req, res) {
    setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
});

router.post('/', function(req, res) {
    res.send('Post request');
});

router.put('/', function(req, res) {
    res.send('Put request');
});

router.delete('/', function(req, res) {
    res.send('Delete request');
});

module.exports = router;