const mongoose=require('mongoose')
const Order=require('./Order')

const userSchema=mongoose.Schema({
  
    name:{
        type:String,
        require:true,
        max:255,
        min:6
    },
    email:{
        type:String,
        require:true,
        max:255,
        min:6
    },
    password:{
        type:String,
        require:true,
        max:1024,
        min:6
    },
    date:{
        type:Date,
        defaule:Date.now
    },
    // orders:{
    //     required:true, 
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Order'
    // }

   
    
})

module.exports=mongoose.model('User', userSchema)

//shahid1@123