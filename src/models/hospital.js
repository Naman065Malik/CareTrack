const mongoose = require("mongoose");
// const { required } = require("nodemon/lib/config");
const HospitalSchema = new mongoose.Schema({
    licenseID: {
        type: String,
        unique: true,
        required: true
    },
    email: {type: String,},
    password: { type: String, required: true },
    name: { type: String},
    address: {type: String},
    pNumber: {type: String},
    totalAmbulance: {type : String},
    speciality: {type : String},
    hospitalType: {
        type : String,
        enum: ["public","private"],
    },
    licensePhoto: {type: String},
    profilePhoto: { type: String, default: "static/images/user.png" },
    status: {
        type: String,
        enum: ["Active", "Blocked", "Wait"],
        defualt: "Active"
    }
},{timestamps: true});

module.exports = mongoose.model("Hospital", HospitalSchema)