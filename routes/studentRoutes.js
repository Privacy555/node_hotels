const express=require('express');
const router=express.Router();

const studentSchema=require('./../7models.js/student');

router.get('/',async(req,res)=>{
    try{
        const datafromDB= await studentSchema.find();
        res.status(200).json(datafromDB);
        console.log("Details fetched successfully.");
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
});

router.get('/:getResult',async(req,res)=>{
    try{
        const getResult= req.params.getResult;
        const datafromDB=await studentSchema.find({result:getResult});
         
        res.status(200).json(datafromDB);
        console.log("Details fetched successfully.");
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
})


router.post('/',async(req,res)=>{
    
    const data=req.body;
    try{
        const newStudent= new studentSchema(data);
        const response= await newStudent.save();                                      //newStudent.save() returns: same data if saved successfully else gives error

        console.log("New student saved successfully.");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
})



router.put('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;

        const updatedData= await studentSchema.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });

        if(!updatedData){
                return res.status(404).json({error:"student not found."});
        }

        console.log("Updated successfully.");
        res.status(200).json(updatedData);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const response= await studentSchema.findByIdAndDelete(id);
        
        if(!response){
            return res.status(404).json({error:'student not found.'});
        }

        console.log("Student deleted successfully.");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error.'});
    }
});


module.exports=router;