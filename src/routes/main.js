const express = require("express");
const { route } = require("express/lib/application");
const auth = require("../Middleware/auth");

const router = express.Router();

//Patient Panel
router.get("/", auth.verifyPatient,  (req,res) =>{
    res.render("Patient_Panel")
})

router.get("/profile", auth.verifyPatient, (req,res) =>{
    res.render("Patient_Profile",
    {
        user: req.rootuser
    })
})

router.get("/profile/update", auth.verifyPatient, (req,res) =>{
    res.render("Patient_Profile_Update")
})

router.get("/register", (req,res) =>{
    res.render("Register")
})

router.get("/register/patient", (req,res) =>{
    res.render("Patient_Register");
})
router.get("/hospitalpanel", auth.verifyHospital,  (req,res) =>{
    // res.send("This Hospital Panel Page")
    res.render("Hospital_panel");
})

router.get("/driverpanel", auth.verifyDriver,  (req,res) =>{
    res.send("This Driver Panel Page")
})

router.get("/doctorpanel", auth.verifyDoctor,  (req,res) =>{
    res.send("This Doctor Panel Page")
})


module.exports = router;
