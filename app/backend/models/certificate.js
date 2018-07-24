var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CertificateSchema = new Schema({
    UserId: {
        type: String
    },
    CertificateFileName: {
        type: String
    },
    CertificateFilePath: {
        type: String
    },
    FileType: {
        type: String
    },
    ThumbnailType: {
        type: String
    },
    SavedDate: {
        type: String
    },
    CertificateSituation: {
        type: Boolean
    },
    ProfileBase64Pic: {
        type: String
    }
});


module.exports = mongoose.model('Certificate', CertificateSchema);