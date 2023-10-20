const jwt = require("jsonwebtoken");
const SecretKey = 'TechTitans_CareTrack'; 

//Models
const patient = require("../models/patient")
const doctor = require("../models/doctor");
const driver = require("../models/driver");
const hospital = require("../models/hospital");

async function verifyHospital(req,res,next){
    try{
        const token = req.cookies.jwt ;
        const verifyToken = jwt.verify(token,SecretKey);
        
        if(verifyToken.userType == "hospital"){
            const rootuser = await hospital.findOne({licenseID: verifyToken.userID});
            if(!rootuser){
                res.send("Something Went Wrong Please Login Again");
            }
            req.rootuser = rootuser;
            next();
        }else{
            res.send("You are not allowed to Enter in Hospital Panel");
        }
    } catch(err){
        res.redirect("/auth/");
    }
}

async function verifyDriver(req,res,next){
    try{
        const token = req.cookies.jwt ;
        const verifyToken = jwt.verify(token,SecretKey);
        
        if(verifyToken.userType == "driver"){
            const rootuser = await driver.findOne({DriverID: verifyToken.userID});
            if(!rootuser){
                res.send("Something Went Wrong Please Login Again");
            }
            req.rootuser = rootuser;
            next();
        }else{
            res.send("You are not allowed to Enter in Driver Panel");
        }
    } catch(err){
        res.redirect("/auth/");
    }
}

async function verifyDoctor(req,res,next){
    try{
        const token = req.cookies.jwt ;
        const verifyToken = jwt.verify(token,SecretKey);
        
        if(verifyToken.userType == "doctor"){
            const rootuser = await doctor.findOne({DoctorID: verifyToken.userID});
            if(!rootuser){
                res.send("Something Went Wrong Please Login Again");
            }
            req.rootuser = rootuser;
            next();
        }else{
            res.send("You are not allowed to Enter in Doctor Panel");
        }
    } catch(err){
        res.redirect("/auth/");
    }
}

async function verifyPatient(req,res,next){
    try{
        const token = req.cookies.jwt ;
        const verifyToken = jwt.verify(token,SecretKey);
        
        if(verifyToken.userType == "patient"){
            const rootuser = await patient.findOne({patientID: verifyToken.userID});
            if(!rootuser){
                res.send("Something Went Wrong Please Login Again");
            }
            req.rootuser = rootuser;
            next();
        }else{
            res.send("You are not allowed to Enter in Patient Panel");
        }
    } catch(err){
        res.redirect("/auth");
    }
}

module.exports = {
    verifyHospital,
    verifyDoctor,
    verifyDriver,
    verifyPatient
};