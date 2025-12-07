const express=require('express');
const router=express.Router();

const Menu=require('./../7models.js/menu');

router.post('/',async(req,res)=>{
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
router.get('/',async(req,res)=>{
    try{
        const datafromMenuDB=await Menu.find();
        console.log("data fetched successfully");
        res.status(200).json(datafromMenuDB);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error..."});
    }
});

router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType= req.params.tasteType;

        if(tasteType=='spicy' || tasteType=='sweet' || tasteType=='salty'){
            const response= await Menu.find({taste:tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid item given.'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error.'});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const dataToUpdate=req.body;
        const idToDelete=req.params.id;

        const response=await Menu.findByIdAndUpdate(idToDelete,dataToUpdate,{
            new:true,
            runValidators:true
        });

        if(!response){
            return res.status(404).json({error:"Menu not found."});
        }

        console.log("Data updated successfully");
        res.status(200).json(response);
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const idToDelete=req.params.id;
        const response= await Menu.findByIdAndDelete(idToDelete);
        if(!response){
            return res.status(404).json({error:"Item not found."});
        }
        console.log("Id deleted");
        res.status(200).json(response);

    }catch(err){
        console.log(err);                                                           //this will print error to server side
        res.status(500).json({error:"Internal server error."})                      //this will send error with status code to client side.
    }
})

module.exports=router;