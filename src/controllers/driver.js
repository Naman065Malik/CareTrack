const driver = require('../models/driver');

async function createdriver(req, res, next) {
  try {
    // Extract data from the request and create a new Hospital document
    const newdriver = new driver({
      DriverID: `DRI${req.body.driverID}`,
      Password: req.body.password,
      HospitalID: req.body.hospitalID,
      Name: req.body.driverName,
      email: req.body.email,
      Age: req.body.age,
      Pnumber: req.body.phoneNumber,
      Ambulancenumber: req.body.ambulanceNumber,
      LicenseNo: req.body.licenseNo,
      LicensePhoto: req.files.licensePhoto[0].path,
      AadhaarNo: req.body.aadharNo,
      AadhaarPhoto: req.files.aadharPhoto[0].path,
      DriverIDPhoto: req.files.driverIDPhoto[0].path,
      ProfilePhoto: req.files.profilePhoto[0].path,
    });

    
    const savedriver = await newdriver.save();

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving data to MongoDB.' });
  }
}

module.exports = createdriver;