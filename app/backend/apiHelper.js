var https = require('https');
var helper = {};
var jwt = require('jsonwebtoken');

// create Token 
helper.createToken = function (user) {
    var user = {
        _id: user._id,
        Email: user.Email,
        NameSurname: user.NameSurname
    }

    var token = jwt.sign({
        user: user
    }, 'secretKey', {});

    return token;
}

helper.DefineExtension = function (item) {

    var type = item.mimetype;

    if (type == "image/jpeg") {
        return ".jpg";
    } else if (type == "image/png") {
        return ".png"
    }
}

module.exports = helper;