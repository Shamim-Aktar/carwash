const express=require('express')
const verify=require('./verifytoken')
const router=express.Router()
const Details=require('../models/Details')


router.post('/vehicle', verify, async (req, res)=>{
    const details=new Details({
        brandname:req.body.brandname,
        modelname:req.body.modelname,
        vehiclenumberplate:req.body.vehiclenumberplate
    })
    try{
        const saveDetails=await details.save()
        console.log(saveDetails)
        res.send(saveDetails)

    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/vehicle/:id',verify, (req, res)=>{
    Details.findById(req.params.id, (error, data)=>{
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                vehicledetail: data
            })
        }
    })
})





module.exports=router