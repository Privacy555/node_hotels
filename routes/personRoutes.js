const express=require('express');
const router=express.Router();

const Person=require('./../7models.js/person');

const {jwtAuthMiddleware,generateToken}=require('./../jwt');


router.post('/signup',async (req,res)=>{
    const data=req.body

    try{
        
    //create a new Person document using the  Mongoose model
    const newPerson= new Person(data);
    // newPerson.name=data.name;// newPerson.age=data.age;// newPerson.mobile=data.mobile;// newPerson.email=data.email;// newPerson.address=data.address; ,instead we passed data in person format.

    //save the new person to the database
    const response=await newPerson.save();
    console.log("Data saved.");

    const payload={
        id:response.id,
        username:response.username
    }

    const token =generateToken(payload);
    console.log("Token is : "+token);

    res.status(200).json({response:response,token:token});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
    
})

router.post('/login',async(req,res)=>{
    try{
        //const user=req.body;  const username=user.username ; const password=user.password
        const {username,password}=req.body;

        const user= await Person.findOne({username:username})

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password ."});
        }

        //generate token
        const payload={
            id:user.id,
            username:user.username
        }

        const token= generateToken(payload);

        res.json({token});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
})

//get method to get the person
router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        const datafromDB=await Person.find();                                                              // “Hey MongoDB, fetch all documents from the people collection using the Person model. Person.find() says that
        console.log("data fetched");
        res.status(200).json(datafromDB);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
})

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{

        const userData=req.user
        console.log("user data : ",userData);
        
        const userId=userData.id;
        const user= await Person.findById(userId);

        res.status(200).json({user});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
})

router.get('/:workType',async(req,res)=>{                                                                   //You are telling Express:
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

//update method
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedData=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatedData,{
            new:true,                           //RETURN THE UPDATED DOCUMENT
            runValidators:true                  //run mongoose validation
        })

        if(!response){
            return res.status(404).json({error:"Person not found."});
        }

        console.log("Data updated.");
        res.status(200).json(response);
        

    }catch(err){

        console.log(err);
        res.status(500).json({error:"Internal server error."});

    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const idToDelete=req.params.id;
        const response=await Person.findByIdAndDelete(idToDelete);
        console.log("Person deleted successfully.");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
});



module.exports=router;