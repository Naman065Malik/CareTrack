const doctor = require('../models/doctor');

async function createdoctor(req, res, next) {
  try {
    // Extract data from the request and create a new Hospital document
    const newdoctor = new doctor({
        DoctorID: `DOC${req.body.doctorID}`,
        Password: req.body.password,
        Name: req.body.name,
        Age: req.body.age,
        Address: req.body.address,
        Pnumber: req.body.Pnumber,
        AadhaarNo: req.body.aadharNo,
        AadhaarPhoto: req.files.aadharPhoto[0].path,
        HospitalID: req.body.hospitalID,
        HospitalIDPhoto: req.files.hospitalIDPhoto[0].path,
        ProfilePhoto: req.files.profilePhoto[0].path,
    });

    const savedoctor = await newdoctor.save();

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving data to MongoDB.' });
  }
}

module.exports = createdoctor;