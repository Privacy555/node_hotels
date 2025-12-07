const mongoose=require('mongoose');


const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','salty','spicy'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:null
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        required:true
    }
});

const Menu=mongoose.model('Menu',menuSchema);                           //capital first letter because its standard and import as same name in server
module.exports=Menu;