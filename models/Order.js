const mongoose=require('mongoose')
let serviceType='Fullwash'
//const user=require('../models/User')

 //_id:mongoose.Schema.Types.ObjectId,
    // orderItem:{
    //     type:mongoose.Schema.Types.ObjectId,
    //    ref:'Details'
    // },
const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   carType:{
    type:String,
    require:true
   },
   serviceType:{type:String },
   bookingNumber:{
       type:Number
   },
   paymentMode:{
       type:String
   },
   price:{
       type:Number
   },
   address:{
       type:String
   },
   date:{
       type:Date
   },
   user:{
       required:true, 
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
   }

},    
{ timestamps: true }
)


module.exports=mongoose.model('Order', orderSchema)