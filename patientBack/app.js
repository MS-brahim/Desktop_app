const express = require('express');
const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/patientDB';
const app = express();
const cors = require('cors');

mongoose.connect(DB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, ()=>{
    console.log("Success!! connected to db");
});

app.use(cors());
// routes 
const patientRoute = require('./routes/patients');
const ficheRoute = require('./routes/fiches');
app.use('/fiche', ficheRoute);
app.use('/patient', patientRoute);

//mongoose.disconnect();
app.listen(3000);
