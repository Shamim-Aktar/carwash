const express=require('express')
const verify=require('./verifytoken')
const mongoose = require("mongoose");
const router=express.Router()
const Order=require('../models/Order')



router.post('/order',(req, res)=>{
    let order=new Order({
        _id:mongoose.Types.ObjectId(),
        serviceType:req.body.serviceType,
        orderItem:req.body.detailId,
        quantity:req.body.quantity
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

module.exports=router
