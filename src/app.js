const express = require("express");
const hbs = require("./controllers/templateEngine");
const bodyParser = require('body-parser');
const CookieParser = require("cookie-parser");

require("./db/cons");

//Models
const Patient = require("./models/patient");
const Doctor = require("./models/doctor");
const Driver = require("./models/driver");
const Hospital = require("./models/hospital");

//Routes Imported
const patientRoute = require("./routes/main.js");
const authRoute = require("./routes/auth.js");

//App initialized
const app = express();

// app.use(bodyParser.urlencoded());
app.use(CookieParser());
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));
app.use(express.json({limit: '50mb',strict: false}));
app.set("view engine", "hbs");
app.set("views", "views");

app.use('/static', express.static('public'))
app.use("",patientRoute);
app.use("/auth",authRoute);

app.listen(3000,"0.0.0.0", () =>{
    console.log(`Server is listening at port no 3000`);
});