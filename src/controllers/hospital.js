const Hospital = require('../models/hospital');

async function createHospital(req, res, next) {
  try {
    // Extract data from the request and create a new Hospital document
    const newHospital = new Hospital({
      licenseID: `HOS${req.body.licenseID}`,
      name: req.body.hospitalName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      pNumber: req.body.phoneNumber,
      totalAmbulance: req.body.ambulanceCount,
      speciality: req.body.speciality,
      hospitalType: req.body.hospitalType,
      licensePhoto: req.files.licensePhoto[0].filename,
      profilePhoto: req.files.profilePhoto[0].filename,
    });

    // Save the newHospital document to the database
    const savedHospital = await newHospital.save();

    // res.status(201).json(savedHospital); // Respond with the saved hospital data
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving data to MongoDB.' });
  }
}

module.exports = createHospital;