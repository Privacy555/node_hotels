//The db.js file is essentially responsible for establishing a connection between your Node.js application and your MongoDB database using the Mongoose library.

const mongoose=require('mongoose');

require('dotenv').config();                  

// 1. define the mongodb connection URL

//const mongoURL=process.env.local_URL                                     use for local url ,hotel in that url is a database name 
const mongoURL=process.env.MONGODB_URL;

// 2. set up mongodb connection
mongoose.connect(mongoURL);
  


// 3. get the default connection
// mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;


// 4. define event listeners for database connection
 db.on('connected',()=>{
    console.log("Connected to mongodb server");
 });

 db.on('error',(err)=>{
    console.log("mongodb connection error",err );
 });

 db.on('disconnected',()=>{
    console.log("disConnected to mongodb server");
 });



 // 5. export the database connection
module.exports=db; 