const mongoose = require("mongoose");
// const { required } = require("nodemon/lib/config");
const DoctorSchema = new mongoose.Schema({
    DoctorID: {
        type: String,
        unique:true,
        required: true,
    },
    Password: { type: String },
    status: {
        type: String,
        enum : ['Active','Blocked','Wait']
    },
    Name: { type: String},
    Age: {type: String},
    Address: {type: String},
    Pnumber: {type: String},
    AadhaarNo: { type: String},
    AadhaarPhoto: { type: String},
    HospitalID: { type: String},
    HospitalIDPhoto: { type: String},
    ProfilePhoto: { type: String, default: "static/images/img/user.png" },
},{timestamps: true});

module.exports = mongoose.model("Doctor", DoctorSchema)