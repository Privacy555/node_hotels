const mongoose=require('mongoose');
const mongooseURL='mongodb://localhost:27017/students';

mongoose.connect(mongooseURL);

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Server is connected to database successfully.")
});

db.on('disconnected',()=>{
    console.log("Server is disconnected to server.");
});

db.on('error',(err)=>{
    console.log(err);
});

module.exports=db;