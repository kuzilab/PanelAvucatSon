var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EssaySchema = new Schema({

    UserId: {
        type: String
    },
    EssayName: {
        type: String
    },
    EssaySubject: {
        type: String
    },
    EssayImgPath: {
        type: String
    },
    EssayContent: {
        type: String
    },
    ProcessDate: {
        type: String
    },
    EssaySituation: {
        type: Boolean
    },
    EssayPicName: {
        type: String
    }
});

module.exports = mongoose.model('Essay', EssaySchema);