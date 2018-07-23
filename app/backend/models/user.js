var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({

    NameSurname: {
        type: String,
        required: false
    },
    ProfilePicPath: {
        type: String,
        required: false,
    },
    ProfileBase64Pic: {
        type: String
    },
    Phone: {
        type: String,
        required: false,
        select: false,
        lowercase: true
    },

    Email: {
        type: String,
        required: false,
        lowercase: true
    },

    ExpertiseFields: {
        type: [],
        required: false,
        select: false
    },
    LatLng: {
        type: String,
        required: false,
        select: false,
        lowercase: true
    },
    Lat: {
        type: Number,
        required: false,
        select: false,
        lowercase: true
    },
    Lng: {
        type: Number,
        required: false,
        select: false,
        lowercase: true
    },
    LocationAddress: {
        type: String
    },
    Password: {
        type: String,
        required: false,
        select: false
    },
    PasswordPlain: {
        type: String,
        required: false,
        select: false
    },

    BureauName: {
        type: String
    },
    BureauWebName: {
        type: String
    },
    Address: {
        type: String
    },

    ExperienceYear: {
        type: Number
    },

    UserWebName: {
        type: String
    },

    Biography: {
        type: String
    },

    TBBNo: {
        type: String
    },

    ADLNo: {
        type: String
    },
    BureauNo: {
        type: String
    },
    BureauCityId: {
        type: Number
    },
    LicenceSchoolName: {
        type: String
    },
    LicenceSchoolId: {
        type: Number
    },
    LicenceSchoolDate: {
        type: String
    },
    HighLicenceSchoolName: {
        type: String
    },
    HighLicenceSchoolId: {
        type: Number
    },
    HighLicenceSchoolDate: {
        type: String
    },
    PostLicenceSchoolName: {
        type: String
    },
    PostLicenceSchoolId: {
        type: Number
    },
    PostLicenceSchoolDate: {
        type: String
    },
    UserKeywords: {
        type: [],
    },
    ProcessDate: {
        type: String
    },
    UserSituation: {
        type: Boolean
    },
    IsBureauWebName: {
        type: Boolean
    },
    IsUserWebName: {
        type: Boolean
    },
    IsLicenceSchoolName: {
        type: Boolean
    },
    IsHighLicenceSchoolName: {
        type: Boolean
    },
    IsPostLicenceSchoolName: {
        type: Boolean
    }
});

UserSchema.pre('save', function (next) {

    // this  = UserSchema
    var user = this;
    if (!user.isModified('Password')) return next();
    bcrypt.hash(user.Password, null, null, function (err, hash) {
        if (err) return next(err);
        user.Password = hash;
        next();
    });
});


UserSchema.methods.comparePassword = function (Password) {

    var user = this;
    return bcrypt.compareSync(Password, user.Password);
};

module.exports = mongoose.model('User', UserSchema);