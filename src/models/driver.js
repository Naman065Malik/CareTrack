const mongoose = require("mongoose");
// const { required } = require("nodemon/lib/config");
const DriverSchema = new mongoose.Schema({
    DriverID: {
        type: String,
        unique:true,
        required: true
    },
    Password: { type: String, required: true },
    // License ID of Hospital
    HospitalID: { type: String, required: true},
    status: {
        type: String,
        enum : ['Active','Blocked','Wait'],
        default: "Active"
    },
    Name: { type: String},
    email: { type: String },
    Age: {type: String},
    Pnumber: {type: String},
    Ambulancenumber: {type: String},
    LicenseNo: { type: String},
    LicensePhoto: { type: String},
    AadhaarNo: { type: String},
    AadhaarPhoto: { type: String},
    DriverIDPhoto: { type: String},
    ProfilePhoto: { type: String, default: "static/images/user.png" },
},{timestamps: true});

module.exports = mongoose.model("Driver", DriverSchema)