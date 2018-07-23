var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocialSchema = new Schema({


    UserId: {
        type: String
    },

    BureauFacebook: {
        type: String
    },

    BureauInstagram: {
        type: String
    },

    BureauTwitter: {
        type: String
    },

    UserFacebook: {
        type: String
    },

    UserInstagram: {
        type: String
    },
    UserTwitter: {
        type: String
    },
    ProcessDate: {
        type: String
    }
});

module.exports = mongoose.model('Social', SocialSchema);