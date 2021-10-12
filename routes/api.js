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

module.exports = router;