const mongoose=require('mongoose')
let serviceType='Fullwash'
const orderSchema=mongoose.Schema({
    
  _id:mongoose.Schema.Types.ObjectId,
    orderItem:{
        type:mongoose.Schema.Types.ObjectId,
       ref:'Details', require:true
    },
    serviceType:{type:String,
        default:serviceType},
    quantity:{
        type:Number,
        default:1
        
    },
  

},    
{ timestamps: true }
)


module.exports=mongoose.model('Order', orderSchema)