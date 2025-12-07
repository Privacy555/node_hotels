const express=require('express');
const app=express();

const db=require('./studentDB');

const bodyParser=require('body-parser');
app.use(bodyParser.json());

// apks
const studentRoutes=require('./routes/studentRoutes');
app.use('/student',studentRoutes);



app.listen(3000,()=>{console.log("Server is listening at port 3000")});