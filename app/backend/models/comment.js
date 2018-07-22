var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({

    UserId: {
        type: String
    },
    WhoComment: {
        type: String
    },
    CommentContent: {
        type: String
    },
    UserSpeed: {
        type: Number
    },
    UserExperince: {
        type: Number
    },
    UserNetwork: {
        type: Number
    },
    UserAverageScore: {
        type: Number
    },
    CommentVisible: {
        type: Boolean
    },
    SavedDate: {
        type: String
    }
});

module.exports = mongoose.model('Comment', CommentSchema);