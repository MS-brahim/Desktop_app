const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const PatientSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    CIN:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        validate: [validateEmail, 'Veuillez remplir une adresse e-mail valide']    
    },
    phone:{
        type:String,
        required:true
    },
    create_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Patients', PatientSchema);

