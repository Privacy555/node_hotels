const express=require('express');
const app=express();

//importing db(mongoose one) for connection with server
const db=require('./7db')


//for dot env
require('dotenv').config();


//importing Person.js
const Person=require('./7models.js/person')

//importing bodyParser
const bodyParser=require('body-parser');
app.use(bodyParser.json());                                             //stores in req.body        ,       since we are using for json file,so we have include .json()

//for menu
const Menu=require('./7models.js/menu')             
//post route to add a menu
app.post('/menu',async(req,res)=>{
     const data=req.body;
    try{
       
        const newMenu=new Menu(data);
        const response=await newMenu.save();

        console.log("Data saved.")
        res.status(200).json(data);
    }catch(err){

        console.log(err);
        res.status(500).json({error:"Internal server error..."});
    }
})

//get route to read menu
app.get('/menu',async(req,res)=>{
    try{
        const datafromMenuDB=await Menu.find();
        console.log("data fetched successfully");
        res.status(200).json(datafromMenuDB);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error..."});
    }
})

//POST route to add a person
app.post('/person',async (req,res)=>{
    const data=req.body

    try{
        
    //create a new Person document using the  Mongoose model
    const newPerson= new Person(data);
    // newPerson.name=data.name;// newPerson.age=data.age;// newPerson.mobile=data.mobile;// newPerson.email=data.email;// newPerson.address=data.address; ,instead we passed data in person format.

    //save the new person to the database
    const response=await newPerson.save();
    console.log("Data saved.");
    res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
    
})

//get method to get the person
app.get('/person',async(req,res)=>{
    try{
        const datafromDB=await Person.find();                                                              // “Hey MongoDB, fetch all documents from the people collection using the Person model. Person.find() says that
        console.log("data fetched");
        res.status(200).json(datafromDB);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
})


app.get('/person/:workType',async(req,res)=>{                                                               //You are telling Express:
    try{                                                                                                    //After /person/ , Whatever comes next in the URL
        const workType= req.params.workType;                                                                //Should be captured into a variable named workType
        if(workType=='chef' ||workType=='manager' ||workType=='waiter'){                                
            const response= await Person.find({work:workType});
            console.log('reponse fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"invalid work type"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error.'});
    }
})

app.get('/',(req,res)=>{
    res.send("Welcome to my hotel. how can i help you? We have list of menus.");
})


const PORT=process.env.PORT || 3000                         //if there is no port in env file ,then use 3000

app.listen(PORT,()=>{
    console.log("Server started on port 3000")
})