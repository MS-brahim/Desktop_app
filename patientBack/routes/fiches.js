const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// model 
const Fiche = require('../models/Fiche');

// middleware
router.use(bodyParser.json());

router.post('/', async (req, res, next)=>{
    const fiche = new Fiche({
    patientID: req.body.patientID,
    questionID:req.body.questionID,
    // medecinID: req.body.medecinID
    });
    try {
        const results = await fiche.save();
        res.json(results);
    } catch (err) {
        
    }
});

router.get('/', async (req, res, next)=>{
    try {
        const fiches = await Fiche.find().populate('patientID').populate('questionID');
        res.json(fiches);
        console.log(fiches);
    } catch (err) {
        res.json({message:err});
    }
});

router.patch('/update/:id', async (req, res, next)=>{
    try {
        const updateFiche = await Fiche.updateOne(
            {_id: req.params.id},
            {$set:{result_test:req.body.result_test}});
            
        res.json(updateFiche);
        console.log(updateFiche);
    } catch (err) {
        res.json({message:err});
    }
});

// Remove fiche
router.delete('/remove/:id', async (req, res, next)=>{
    try {
        const fiche = await Fiche.remove({_id:req.params.id});
        res.json(fiche);
    } catch (err) {
        res.json({message:err});
    }
});

// find fiche by Object id 
router.get('/:id', async (req, res, next)=>{
   
    try {
        const fiche = await Fiche.findById(req.params.id).populate('patientID').populate('questionID')
        res.json(fiche);
        console.log(fiche._id)
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;