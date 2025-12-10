const mongoose=require('mongoose');

const bcrypt=require('bcrypt');

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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//Encrypting pwd      (When using async middleware, you must NOT use next().)
personSchema.pre("save",async function(){                                   //arrow function ()=>{} doesn't give this because arrow functions do not bind their own this.
    const person=this;
    try{
        //hash the pwd if it has been modified or new
        if(!person.isModified('password')) return;

        //salt generation
        const salt=await bcrypt.genSalt(10);
        
        const hashedPassword= await bcrypt.hash(person.password,salt);
        
        //override the plain password with hashed password 
        person.password=hashedPassword;

    }catch(err){
        //return err;                     //return error does nothing
        throw err;
    }
})

personSchema.methods.comparePassword=async function (candidatePassword) {                                   //personSchema.methods.comparePassword = ... means you are adding a custom method to all Person documents created from your Mongoose schema.
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch= await bcrypt.compare(candidatePassword,this.password);               //returns true or false. we must add await here ,otherwise it won't wait for that function's result . that might cause in login with wrong credentials
        return isMatch;
    }catch(err){
        throw err;
    }
}

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