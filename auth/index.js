(function (auth) {

    var data = require('../data');
    var hasher = require('./hasher'); 
    
    auth.checkuser = function (username, password, next) {
        data.getUser(username, function (err, user) {
            if (err) {
                console.log('Error: user not found');
                next(err, null); 
            }
            else {
                if (user !== null) {
                    var testHash = hasher.computeHash(password, user.salt);
                    if (testHash === user.passwordHash) {
                        next(null, user);
                    }
                    else {
                        next("User not valid", null); 
                    }
                }
                else {
                    console.log('User is null'); 
                    next("User is null", null); 
                }
            }
        });
    }

    auth.register = function (userbody, next) {
        console.log('Register user'); 
        var salt = hasher.createSalt();

        var user = {
            name: userbody.name,
            lastname: userbody.lastname,
            email: userbody.email,
            username: userbody.email,
            passwordHash: hasher.computeHash(userbody.password, salt),
            salt: salt
        };

        data.addUser(user, function (err, userret) {
            if (err) {
                next(err, null);
            }
            else {
                next(null, userret.ops[0]); 
            }
        });
    }

})(module.exports);