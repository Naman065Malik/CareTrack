const mongoose = require("mongoose");
// const { required } = require("nodemon/lib/config");
const PatientSchema = new mongoose.Schema({
    patientID: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String },
    name: { type: String},
    age: {type: String},
    address: {type: String},
    disease: {type: String},
    Pnumber: {type: String},
    profilePhoto: { type: String, default: "static/img/user.png" },
},{timestamps: true});

module.exports = mongoose.model("Patient", PatientSchema)