const express=require('express');
const app=express();

const passport=require('./auth');


//middleware function   (keep it before routing files)
const logRequest=(req,res,next)=>{
    console.log("middleware reached");
    console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}`);
    next();                     //signal to next js that the current middleware function is completed and it's time to move on next middleware function  or route handler in the chain.
}
app.use(logRequest);


app.use(passport.initialize());
const authenticateMiddleware=passport.authenticate('local',{session:false});      //to access Person data , the user should have id and password in person collection.(i.e the authentication logic is made on username password of user in Person collection.)


//importing db(mongoose one) for connection with server
const db=require('./7db')


//for dot env
require('dotenv').config();

const PORT=process.env.PORT || 3000                     //if there is no PORT in env file then use 3000

//importing bodyParser
const bodyParser=require('body-parser');
app.use(bodyParser.json());                                             //stores in req.body        ,       since we are using for json file,so we have include .json()




// pathway for personRoutes
const personRoutes=require('./routes/personRoutes');
app.use('/person',authenticateMiddleware,personRoutes);                                        //we use person here cuz person was common in each path of  get ,post apks


//pathway for menuRoutes
const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);                   


app.get('/',function(req,res){
    res.send("Welcome to my hotel. how can i help you? We have list of menus.");
})



app.listen(PORT,()=>{
    console.log("Server started on port 3000")
})

