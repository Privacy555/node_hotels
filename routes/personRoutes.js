const express=require('express');
const router=express.Router();

const Person=require('./../7models.js/person');



router.post('/',async (req,res)=>{
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
router.get('/',async(req,res)=>{
    try{
        const datafromDB=await Person.find();                                                              // “Hey MongoDB, fetch all documents from the people collection using the Person model. Person.find() says that
        console.log("data fetched");
        res.status(200).json(datafromDB);
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