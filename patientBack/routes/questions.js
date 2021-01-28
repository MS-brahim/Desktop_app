const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// model 
const Question = require('../models/Question');

// middleware
router.use(bodyParser.json());

router.post('/', async (req, res, next)=>{
    const qs = new Question({
        question: req.body.question,
        patientID: req.body.patientID
    });
    try {
        const sv = await qs.save();
        res.json(sv);
    } catch (err) {
        
    }
});

router.get('/', async (req, res, next)=>{
    try {
        const questions = await Question.find().populate('patientID');
        res.json(questions);
        // console.log(questions);
    } catch (err) {
        res.json({message:err});
    }
});

router.get('/:id', async (req, res, next)=>{
   
    try {
        const question = await Question.findById(req.params.id);
        res.json(question);
        console.log(question._id)
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;