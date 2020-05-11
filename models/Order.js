const mongoose=require('mongoose')
let serviceType='Fullwash'
const orderSchema=mongoose.Schema({
    
  //_id:mongoose.Schema.Types.ObjectId,
    // orderItem:{
    //     type:mongoose.Schema.Types.ObjectId,
    //    ref:'Details'
    // },
  
   carType:{
    type:String,
    require:true
   },
   serviceType:{type:String },
   bookingNumber:{
       type:Number
   },
   paymnentMode:{
       type:String
   },
   price:{
       type:Number
   },
   address:{
       type:String
   }

},    
{ timestamps: true }
)


module.exports=mongoose.model('Order', orderSchema)