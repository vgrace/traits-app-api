var express = require('express');
var router = express.Router();
var data = require('../data/index');
var auth = require('../auth/index');

/* USER */

// Add a new user to the list
router.post('/user', function (req, res, next) {
    var user = req.body;
    auth.register(user, function (err, createduser) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            console.log(createduser);
            res.send(createduser);
        }
    });
}); 

// Sign in user
router.post('/usersignin', function (req, res, next) {
    var user_creds = req.body;
    auth.checkuser(req.body.email, req.body.password, function (err, user) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            var ret_err = {
                "message": "User validation failed"
            };
            res.status(500).send(ret_err);
        }
        else {
            console.log(user);
            res.send(user);
        }
    });
});

/* PERSONALITY */

// Get personality list
router.get('/personality', function (req, res, next) {
    data.getAllPersonalities(function (err, personalities) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            res.send(personalities);
        }
    });
});

// Create personality
router.post('/personality', function (req, res, next) {
    var personality = req.body;
    res.setHeader('Content-Type', 'application/json');
    data.addPersonality(personality, function (err, personalitySaved) {
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            console.log(personalitySaved);
            res.json({ success: 1, description: "Personality added" });
        }
    });
});

// Get personality by type
router.get('/personality/:type', function (req, res, next) {
    var personality_type = req.params.type;
    console.log('TEST -------------------------> ' + personality_type);
    data.getPersonality(personality_type, function (err, personality) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            console.log(personality);
            res.send(personality);
        }
    });
});

/* USER TYPE PART */

// Add User Type Part
router.post('/userTypePart', function (req, res, next) {
    var user_type_part = req.body;
    res.setHeader('Content-Type', 'application/json');
    data.addUserTypeParts(user_type_part.username, user_type_part.type_percentage, function (err) {
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            res.json({ success: 1, description: "User type part added" });
        }
    });
})

/* PEOPLE */

// Add a new person to the list
router.post('/people', function (req, res, next) {
    var person = req.body;
    res.setHeader('Content-Type', 'application/json');
    data.addPerson(person, function (err, personSaved) {
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            console.log(personSaved);
            res.json({ success: 1, description: "Person added" });
        }
    });
});

// Get peolple list
router.get('/people', function (req, res, next) {
    data.getAllPeople(function (err, people) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            res.send(people);
        }
    });
});

// Get people by type
router.get('/people/:type', function (req, res, next) {
    var type = req.params.type;
    data.getPeopleByType(type, function (err, people) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            res.send(people);
        }
    });
});


/* DESCRIPTION */

// Add a new description
router.post('/description', function (req, res, next) {
    var person = req.body;
    res.setHeader('Content-Type', 'application/json');
    data.addDescription(person, function (err, descriptionSaved) {
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            console.log(descriptionSaved);
            res.json({ success: 1, description: "Description added" });
        }
    });
});

// Get descriptions by type
router.get('/descriptions/:type', function (req, res, next) {
    var type = req.params.type;
    data.getDescriptionsByType(type, function (err, descriptions) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            res.send(descriptions);
        }
    });
});

/* USER TRAITS */

// Add a new user traits to user
router.post('/userTraits', function (req, res, next) {
    var user_traits = req.body;
    res.setHeader('Content-Type', 'application/json');
    data.addUserTraits(user_traits.username, user_traits.traits, function (err) {
        if (err) {
            var ret_err = {
                "message": err
            };
            res.status(500).send(ret_err);
        }
        else {
            res.json({ success: 1, description: "User traits added" });
        }
    });
});

module.exports = router;