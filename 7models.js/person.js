const mongoose=require('mongoose');

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['manager','chef','waiter'],                   //value should be among these 3
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:String,
        required:true
    }
});


//create a person model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;


/*  //this is for JSON format data from frontend
 
{
"name":"Alice",
"age":28,
"work":"Chef",
"mobile":"123-456-7890",
"email":"alice@gmail.com",
"address":"Ambala,Haryana",
"salary":"120000"
};

*/