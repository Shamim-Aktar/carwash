const express=require('express')
const verify=require('./verifytoken')
const mongoose = require("mongoose");
const router=express.Router()
const Order=require('../models/Order')
const _ = require('lodash');



router.post('/order',verify, (req, res)=>{
    console.log('user',req.user._id)
    let order=new Order({
        
        // orderItem:req.body.detailsId,
        _id:mongoose.Types.ObjectId(),
        carType:req.body.carType,
        
        serviceType:req.body.serviceType,
        bookingNumber:req.body.bookingNumber,
        paymentMode:req.body.paymentMode,
        price:req.body.price,
        address:req.body.address,
        date:req.body.date,
         user:req.user._id        
    })

    order.save().then(result=>{
        res.status(201).json(result)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.get('/order', verify, (req, res)=>{

    Order.find({user:req.user._id},(err, docs)=>{

              if(err){
                  res.status(400).send(err)
              }
              else{
                  res.status(200).json({docs})
              }
                 

    })
})

//     Order.find({},(err, order)=>{
//         if(err){
//             res.status(404).json({err})
//         }
//         res.status(200).json({order})
//         // return res.status(200).json({ status: true, order : _.pick(order,['carType','serviceType',
//         // 'bookingNumber','paymnentMode','price','address']) });
//     })
// })


router.delete('/order/:id',verify, (req, res)=>{
    const id=req.params.id
    Order.findByIdAndDelete(id, (err, data)=>{
        if(err){
            res.status(404).json({err})
        }
        res.status(200).json({data})
    })

    
})

module.exports=router


