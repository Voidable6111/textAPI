//import dependencies
var express = require('express');
var app = express();
var apiRoutes = require('./routes/api');
var rootRoutes = require('./routes/root');
var bodyParser = require('body-parser');


//(server/middleware)
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

function logAccess(req, res, next){
    console.log(req.method, req.originalUrl);
    next();
}
app.use(logAccess);

// more endpoints
app.use('/', rootRoutes);
app.use('/api', apiRoutes);

//serve out app
var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening on", host, port);
});