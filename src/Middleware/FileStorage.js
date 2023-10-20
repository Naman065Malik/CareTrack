const multer = require('multer');
const fs = require('fs');

const HospitalStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const hospitalName = req.body.hospitalName;
        const destinationFolder = `uploads/hospital/${hospitalName}`;
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
        }
        cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      const filename = file.fieldname;
    //   console.log(file);
      cb(null, filename + "." + ext);
    },
});

const DriverStorage = multer.diskStorage({
  destination: function (req, file, cb) {
      const driverName = req.body.driverName;
      const destinationFolder = `uploads/driver/${driverName}`;
      if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
      }
      cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = file.fieldname;
  //   console.log(file);
    cb(null, filename + "." + ext);
  },
});

const DoctorStorage = multer.diskStorage({
  destination: function (req, file, cb) {
      const doctorName = req.body.doctorName;
      const destinationFolder = `uploads/doctor/${doctorName}`;
      if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
      }
      cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = file.fieldname;
  //   console.log(file);
    cb(null, filename + "." + ext);
  },
});

const PatientStorage = multer.diskStorage({
  destination: function (req, file, cb) {
      const patientName = req.body.patientName;
      const destinationFolder = `uploads/patient/${patientName}`;
      if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
      }
      cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = file.fieldname;
  //   console.log(file);
    cb(null, filename + "." + ext);
  },
});

const Hospital = multer({storage: HospitalStorage});
const Driver = multer({storage: DriverStorage});
const Doctor = multer({storage: DoctorStorage});
const Patient = multer({storage: PatientStorage});

module.exports = {Hospital,Driver,Doctor,Patient};