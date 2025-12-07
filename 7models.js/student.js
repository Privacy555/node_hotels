const mongoose=require('mongoose');
const model=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    result:{
        type:String,
        required:true
    },
    CGPA:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    hobbies:{
        type:[String],
        default:['studying']
    }
});


const studentSchema= mongoose.model('studentSchema',model);

module.exports=studentSchema;