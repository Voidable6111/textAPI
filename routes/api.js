//dependencies
var express = require('express');
var router = express.Router();
var fs = require('fs');
var time = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


//endpoints
router.get('/', function(req, res){
    //var rawdata = fs.readFileSync('../data.json');
    //var students = JSON.parse(rawdata);

    //console.log(students);
    time.getMonth();
    time.getDay();
    time.getHours();
    time.getMinutes();
    res.status(200).json({message: "read all." + "( [" + time.getHours() + ":" + time.getMinutes() + "] " + monthNames[time.getMonth()] + " " + time.getDate() +", " +  time.getFullYear() +")"});
    
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