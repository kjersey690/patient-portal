let mongoose = require('mongoose');

//Create Patient Schema
let patientSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  insurance: {
    type: String,
    required: true
  },
  physician: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  }
});

let Patient = module.exports = mongoose.model('Patient', patientSchema);
