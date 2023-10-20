const express = require("express")
const { route } = require("express/lib/application")
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const secretKey = 'TechTitans_CareTrack'; 

//Controllers
const HOScon = require("../controllers/hospital");
const DRIcon = require("../controllers/driver");
const PATcon = require("../controllers/patient");
const DOCcon = require("../controllers/doctor");

//Middleware
const upload = require("../Middleware/FileStorage");
const HOSmid = upload.Hospital.fields([{name: "profilePhoto", maxCount: 1},{name: "licensePhoto", maxCount: 1}]);

const DRImid = upload.Driver.fields([
    {name: "profilePhoto", maxCount: 1},
    {name: "licensePhoto", maxCount: 1},
    {name: "driverIDPhoto", maxCount: 1},
    {name: "aadharPhoto", maxCount: 1}
]);



const PATmid = upload.Patient.fields([{name: "profilePhoto", maxCount: 1}]);

const DOCmid = upload.Doctor.fields([
    {name: "profilePhoto", maxCount: 1},
    {name: "aadharPhoto", maxCount: 1},
    {name: "hospitalIDPhoto", maxCount: 1}
]);


//Models
const Patient = require("../models/patient")
const Doctor = require("../models/doctor");
const Driver = require("../models/driver");
const Hospital = require("../models/hospital");

//Router Setup
const router = express.Router();

router.get("/", (req,res) =>{
    res.render("Login")
})


router.post("/", async (req, res) => {
  const userID = req.body.userID;
  const password = req.body.password;
  var newtoken;
  var type;
  if (userID.startsWith("HOS")) {
    try {
      const hospital = await Hospital.findOne({ licenseID: userID });
      if (hospital) {
        if (hospital.password === password) {
          const token = jwt.sign({ userID, userType: 'hospital' }, secretKey, { expiresIn: '24h'});
          newtoken = token;
          type = "hospital";
        } else {
          res.send("Wrong Password");
        }
      } else {
        res.send("Hospital not found.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error accessing hospital data from MongoDB.' });
    }
  } else if (userID.startsWith("DRI")) {
    try {
      const driver = await Driver.findOne({ DriverID: userID });
      if (driver) {
        if (driver.Password === password) {
          const token = jwt.sign({ userID, userType: 'driver' }, secretKey, { expiresIn: '24h'});
          newtoken = token;
          type = "driver";
        } else {
          res.send("Wrong Password");
        }
      } else {
        res.send("Driver not found.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error accessing driver data from MongoDB.' });
    }
  } else if (userID.startsWith("DOC")) {
    try {
      const doctor = await Doctor.findOne({ DoctorID: userID });
      if (doctor) {
        if (doctor.Password === password) {
          const token = jwt.sign({ userID, userType: 'doctor' }, secretKey, { expiresIn: '24h'});
          newtoken = token;
          type = "doctor";
        } else {
          res.send("Wrong Password");
        }
      } else {
        res.send("Doctor not found.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error accessing doctor data from MongoDB.' });
    }
  } else {
    try {
      const patient = await Patient.findOne({ patientID: userID });
      if (patient) {
        if (patient.password === password) {
          const token = jwt.sign({ userID, userType: 'patient' }, secretKey, { expiresIn: '24h'});
          newtoken = token;
          type = "patient";
        } else {
            res.send("Wrong Password");
        }
      } else {
        res.send("Patient not found.");
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error accessing patient data from MongoDB.' });
    }
  }
    res.cookie("jwt", newtoken, {
        expiresIn: new Date(Date.now() + 25892000000),
        httpOnly: true
    });
    if(type == "hospital"){
        res.redirect("/hospitalpanel");
    }else if(type == "driver"){
        res.redirect("/driverpanel");
    }else if(type == "doctor"){
        res.redirect("/doctorpanel");
    }else if(type == "patient"){
        res.redirect("/");
    }else{
        res.send("Something Went Wrong");
    }
});

//Hospital Registration
router.get("/hospital", (req,res) =>{
    res.render("Registration/hospital")
})

router.post("/hospital", HOSmid,  HOScon, (req,res) =>{
    res.redirect("/hospitalpanel")
})

//Driver Registration
router.get("/driver", (req,res) =>{
    res.render("Registration/driver")
})

router.post("/driver", DRImid, DRIcon, (req,res) =>{
    res.redirect("/driverpanel")
})

router.get("/patient", (req,res) =>{
    res.render("Registration/patient")
})

router.post("/patient", PATcon, (req,res) =>{
    res.redirect("/")
})

router.get("/doctor", (req,res) =>{
    res.render("Registration/doctor")
})

router.post("/doctor", DOCmid, DOCcon, (req,res) =>{
    res.redirect("/doctorpanel")
})

module.exports = router;
