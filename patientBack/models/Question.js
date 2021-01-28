const mongoose = require('mongoose');

const Patient = require('./Patient');

const questionSchema = mongoose.Schema({
    question:{
        type:String  
    },
    patientID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Patient,
        // required:true
    }
},{collection: 'questions'});

module.exports = mongoose.model('questions', questionSchema);

