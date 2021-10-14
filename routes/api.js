// dependencies
var express = require('express');
var router = express.Router();
const fs = require('fs');

// --------------------------------------------------------- Endpoints/Routes

// CRUD - Create, Read, Update, Delete

// get all of a resource - Read
router.get('/', function(req, res) {
    try {
        const rawdata = fs.readFileSync('data.json'); // <Buffer <hex code>
        var messages = JSON.parse(rawdata);
    
        console.log(messages);
        /*messages = messages.filter((val) =>{
            return val.text;
        })*/
    
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get one of a resource - Read
router.get('/:id', function(req, res) {
    try {
        const rawdata = fs.readFileSync('data.json'); // <Buffer <hex code>
        var messages = JSON.parse(rawdata);
        messages[req.params.id].create_on = Date.now();
        res.status(200).json(messages[req.params.id].name + ": " + messages[req.params.id].text + ", created: " + messages[req.params.id].create_on);
        messages[req.params.id].update_on = Date.now();
        //FIGURE TIMESTAMPS OUT HERE. THEN DO THE GET ABOVE WITHOUT AN ID, THEN PLAY CLEANUP BELOW. PRETTY MUCH IT.
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// create a new resource - Create
router.post('/', function(req, res) {
    try {
        console.log("Posted Object is: ", req.body);
        // open the file
        const rawdata = fs.readFileSync('data.json');
        // decode the file (parse) so we can use it
        var messages = JSON.parse(rawdata);

        // add data, but controlled
        var rawBody = req.body;

        var newObj = {
            name: null,
            age: null,
            currentGame: null
        };

        if (rawBody.name != null) {
            newObj.name = rawBody.name;
        }
        
        if (rawBody.age != null) {
            newObj.age = rawBody.age;
        }
        
        if (rawBody.currentGame != null) {
            newObj.currentGame = rawBody.currentGame;
        }
        


        // get the actual index
        newObj._id = messages.length;


        // add our new object to the array
        messages.push(newObj);

        // save (write) the data back to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(messages));

        // return the data to the user
        res.status(201).json(newObj);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// updated a resource - Update
router.patch('/:id', function(req, res) {
    try {
        console.log("Object being patched is: ", req.params.id, req.body);
        // open the file
        const rawdata = fs.readFileSync('data.json');
        // decode the file (parse) so we can use it
        var messages = JSON.parse(rawdata);

        // add data, but controlled
        var id = req.params.id;
        var rawBody = req.body;

        if (rawBody.name != null) {
            messages[id].name = rawBody.name;
        }
        
        if (rawBody.age != null) {
            messages[id].age = rawBody.age;
        }
        
        if (rawBody.currentGame != null) {
            messages[id].currentGame = rawBody.currentGame;
        }

        // save (write) the data back to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(messages));

        // return the data to the user
        res.status(200).json(messages[id]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// delete a resource - Delete
router.delete('/:id', function(req, res) {
    // capture the id
    var id = req.params.id;

    // open the file for reading
    const rawdata = fs.readFileSync('data.json'); // <Buffer <hex code>
    var messages = JSON.parse(rawdata);

    // if found delete it
    if (messages.length > id) {
        // modify the object
        messages.splice(id, 1);

        // write to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(messages));

        res.status(200).json({ message: "ok" });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }    
});

// ----------------------------------------------------------------- end routes/endpoints

module.exports = router;