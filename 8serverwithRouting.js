const express=require('express');
const app=express();

//importing db(mongoose one) for connection with server
const db=require('./7db')


//importing bodyParser
const bodyParser=require('body-parser');
app.use(bodyParser.json());                                             //stores in req.body        ,       since we are using for json file,so we have include .json()

     





// pathway for personRoutes
const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);                                        //we use person here cuz person was common in each path of  get ,post apks


//pathway for menuRoutes
const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);


app.get('/',(req,res)=>{
    res.send("Welcome to my hotel. how can i help you? We have list of menus.");
})

app.listen(3000,()=>{
    console.log("Server started on port 3000")
})