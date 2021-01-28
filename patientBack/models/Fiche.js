const mongoose = require('mongoose');

const Patient = require('./Patient');
const Question = require('./Question');

const ficheSchema = new mongoose.Schema({
    patientID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Patient,
        // required:true
    },
    date_test:{
        type:Date,
        default:Date.now
    },
    questionID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Question
    },
    result_test:{
        type:Boolean,
        default:false,
    }
    // medecinID:{
    //     // type:mongoose.Schema.Types.ObjectId,
    //     // ref:Patient,
    //     // // required:false
    // }
});

module.exports = mongoose.model('fiches', ficheSchema);

