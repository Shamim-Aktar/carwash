const express=require('express')
const verify=require('./verifytoken')
const mongoose = require("mongoose");
const router=express.Router()
const Order=require('../models/Order')
const _ = require('lodash');



router.post('/order', verify, (req, res)=>{
    let order=new Order({
        _id:mongoose.Types.ObjectId(),
        // orderItem:req.body.detailsId,
        carType:req.body.carType,
        
        serviceType:req.body.serviceType,
        bookingNumber:req.body.bookingNumber,
        paymnentMode:req.body.paymnentMode,
        price:req.body.price,
        address:req.body.address
        
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
    Order.find({},(err, order)=>{
        if(err){
            res.status(404).json({err})
        }
        res.status(200).json({order:order})
        // return res.status(200).json({ status: true, order : _.pick(order,['carType','serviceType',
        // 'bookingNumber','paymnentMode','price','address']) });
    })
})

module.exports=router
