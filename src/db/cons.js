const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/hackathon",{}).then(() =>{
    console.log("Database Connection Sucessfully Initiated");
}).catch((e) =>{
    console.log("Error Occured in Establishing Database Connection");
    console.log(e);
})