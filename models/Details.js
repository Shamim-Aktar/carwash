const mongoose=require('mongoose')

const addDetailsSchema=mongoose.Schema({
    brandname:{
        type:String,
        require:true,
        max:255,
        min:6
    },
    modelname:{
        type:String,
        require:true,
        max:255,
        min:6
    },
    vehiclenumberplate:{
        type:String,
        require:true,
        max:255,
        min:6
    },
  

},    
{ timestamps: true }
)

module.exports=mongoose.model('Details', addDetailsSchema)