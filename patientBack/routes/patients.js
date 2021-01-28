const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// model
const Patient = require('../models/Patient');

// routes 
const questionRoute = require('./questions');

router.use('/:id/test', questionRoute);

// middleware
router.use(bodyParser.json());

// find all patients 
router.get('/', async (req, res, next)=>{
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.json({message:err});
    }
});

// find patient by Object id 
router.get('/:id', async (req, res, next)=>{
   
    try {
        const patient = await Patient.findById(req.params.id);
        res.json(patient);
        console.log(patient._id)
    } catch (err) {
        res.json({message:err});
    }
});

// Create new patients 
router.post('/create', async (req, res, next)=>{
    const patient = new Patient({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    CIN: req.body.CIN,
    email: req.body.email,
    phone: req.body.phone,
    create_at: req.body.create_at
    });
    try {
        const savePatient = await patient.save();
        res.json(savePatient);
        
        console.log(savePatient._id);
    } catch (err) {
        res.json({message:err});
    } 
});

// Remove patient
router.delete('/remove/:id', async (req, res, next)=>{
    try {
        const patient = await Patient.remove({_id:req.params.id});
        res.json(patient);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;