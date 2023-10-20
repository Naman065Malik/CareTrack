const patient = require('../models/patient');

async function createpatient(req, res, next) {
  try {
    // Extract data from the request and create a new Hospital document
    const newpatient = new patient({
      patientID: req.body.patientID,
      password: req.body.password,
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
      disease: req.body.disease,
      Pnumber: req.body.Pnumber
    });

    
    const savepatient = await newpatient.save();

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving data to MongoDB.' });
  }
}

module.exports = createpatient;