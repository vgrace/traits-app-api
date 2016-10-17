(function (data) {
    var database = require('./database.js');

    /*
    * DESCRIPTION
    */
    data.addDescription = function (description, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to add description to db: " + err)
                next(err, null);
            }
            else {
                db.descriptions.insert(description, next);
            }
        });
    }

    data.getDescriptionsByType = function (type, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.descriptions.find({ personalitytype: type }).toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    }
                    else {
                        next(null, results);
                    }
                });
            }
        });
    }

    /*
    * PEOPLE
    */
    data.addPerson = function (person, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to add person to db: " + err)
                next(err, null);
            }
            else {
                db.people.insert(person, next);
            }
        });
    }

    data.getPeopleByType = function (type, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.people.find({ personalitytype: type }).toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    }
                    else {
                        next(null, results);
                    }
                });
            }
        });
    }

    data.getAllPeople = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.people.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    }
                    else {
                        next(null, results);
                    }
                });
            }
        });
    }

    /*
    * PERSONALITY
    */
    data.addPersonality = function (personality, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to add personality to db: " + err)
                next(err, null);
            }
            else {
                if (data.getPersonality(personality.type, function (err, checkpersonality) {
                    if (err) {
                        next(err, null);
                }
                else if (checkpersonality === null) {
                    //User does not exist, create user
                    db.personalities.insert(personality, next);
                }
                else {
                        next("Personality already exists", null);
                }
                }));
            }
        }); 
    }

    data.getPersonality = function (personalityType, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.personalities.findOne({ type: personalityType }, next);
            }
        });
    }

    data.getAllPersonalities = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.personalities.find().toArray(function (err, results) { 
                    if (err) {
                        next(err, null);
                    }
                    else {
                        next(null, results);
                    }
                });
            }
        });
    }

    /*
    * USER TRAITS
    */
    data.addUserTraits = function (username, userTraits, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to add user trait");
                next(err, null);
            }
            else {
                for (var i = 0; i < userTraits.length; i++) {
                    db.users.update(
                    { username: username },
                    { $pull: { usertraits: { 'trait': userTraits[i].trait } } })
                }

                db.users.update(
                    { username: username },
                    { $push: { 'usertraits': { $each: userTraits } } },
                    next);
            }
        });
    }

    /*
    * USER TYPE PARTS
    */
    data.addUserTypeParts = function (username, userTypePart, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to add user type part");
                next(err, null);
            }
            else {
                for (var i = 0; i < userTypePart.length; i++) {
                    db.users.update(
                    { username: username },
                    { $pull: { usertypeparts: { 'personalitytype': userTypePart[i].personalitytype } } })
                }
               
                db.users.update(
                    { username: username },
                    { $push: { 'usertypeparts': { $each: userTypePart } } },
                    next);
            }
        });
    }


    /*
    * USER
    */
    data.addUser = function (user, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to create user db: " + err)
                next(err, null); 
            }
            else {
                if (data.getUser(user.username, function (err, checkuser) {
                    if (err) {
                        next(err, null);
                    }
                else if (checkuser === null) {
                        var fullUser = {
                            name: user.name,
                            lastname: user.lastname,
                            email: user.email,
                            username: user.username,
                            passwordHash: user.passwordHash,
                            salt: user.salt,
                            usertypeparts: [],
                            usertraits: []
                        };
                        //User does not exist, create user
                        db.users.insert(fullUser, next);
                    }
                    else {
                        next("User already exists", null);
                    }
                }));
            }
        });
    }

    data.getUser = function (username, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.users.findOne({ username: username }, next);
            }
        });
    }

    data.updateUser = function (username, userupdates, next) {
        database.getDb(function (err, db) {
        	if (err) {
        		next(err);
        	}
        	else {
        	    db.users.update({ username: username }, { $set: { "name": userupdates.name, "lastname": userupdates.lastname } }, next);
        	    //db.users.findOne({ name: username }, next);
        	}
        });
    }
})(module.exports);