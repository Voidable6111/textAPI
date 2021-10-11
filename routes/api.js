//dependencies
var express = require('express');
var router = express.Router();


//endpoints
router.get('/', function(req, res){
    res.status(200).json({message: "read all."});
});
router.post('/', function(req, res){
    res.status(201).json({message: "create"});
});
router.patch('/:id', function(req, res){
    res.status(200).json({message: "edited"});
});
router.delete('/:id', function(req, res){
    res.status(200).json({message: "delete this"});
});



/*app.get('/test', function (req,res) {
    var message = {message: "this is json"};
    res.json(message);
})

app.get('/test/:name', function (req, res){
    console.log('request params: ', req.params);
    console.log('request body', req.body);
    var name = req.params.name;

    res.json({message: name, body: req.body});
})*/
module.exports = router;