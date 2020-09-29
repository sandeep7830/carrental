const mongoose = require('mongoose');
const Schema= mongoose.Schema


const Carschema = new Schema({
    carname:{
        type:String
    },
    capacity:{
     type:Number
    },
   city:{
       type:String
   },
   rent:{
       type:Number
   },
   booking:[
       {
        name:{
            type:String
        },
        phone:{
            type:Number
        },
        dateon:{
            type:Date
        },
        dateoff:{
            type:Date
        }  
       }
   ]
})

module.exports=Car=mongoose.model('Cars',Carschema);