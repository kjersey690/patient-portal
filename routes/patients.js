const express = require('express');
const router = express.Router();



// Bring in patient model
let Patient = require('../models/patient');

router.get('/add', (req, res)=>{
  res.render('add_patients', {
    title: 'Add Patient'
  });
});

router.post('/add', function(req, res){
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('address', 'Address is required').notEmpty();
  req.checkBody('insurance', 'Insurance is required').notEmpty();
  req.checkBody('physician', 'Physician is required').notEmpty();
  req.checkBody('sex', 'Sex is required').notEmpty();

  // Get errors

  let errors = req.validationErrors();

  if(errors){
    res.render('add_patients', {
      title: 'Add Patient',
      errors: errors
    });
  }else{
    let patient = new Patient();
     patient.name = req.body.name;
     patient.address = req.body.address;
     patient.insurance = req.body.insurance;
     patient.physician = req.body.physician;
      patient.sex = req.body.sex;

  patient.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      req.flash('success', 'Patient Added');
      res.redirect('/');
    }
  });

  }


});



// Load Edit Form
router.get('/edit/:id', function(req,res){
  Patient.findById(req.params.id, function(err, patient){
      res.render('edit_patient', {
        patient: patient
      });
  });
});

router.post('/edit/:id', function(req, res){
  let patient = {};
  patient.name = req.body.name;
  patient.address = req.body.address;
  patient.insurance = req.body.insurance;
  patient.physician = req.body.physician;
  patient.sex = req.body.sex;

  let query = {_id: req.params.id}

  Patient.update(query, patient, function(err){
    if(err){
      console.log(err);
      return;
      req.flash('success', 'Patient Editted');
    }else{
      res.redirect('/');
    }
  });
});

router.delete('/:id', function(req, res){
  let query = {_id: req.params.id}
  Patient.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

// Get Single Article
router.get('/:id', function(req, res){
  let id = req.params.id;
  Patient.findById(req.params.id, function(err, patient){
      res.render('patient', {
        patient:patient
      });
  });
});

module.exports = router;