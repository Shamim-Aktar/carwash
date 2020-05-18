const express=require('express')
const verify=require('./verifytoken')
const router=express.Router()
const Details=require('../models/Details')
const multer=require('multer')

const storage=multer.diskStorage({
destination:function(req, file, cb){
    cb(null, '/uploads')
},
filename: function(req, res, cb){
    cb(null, new Date().toISOString()+file.originalname)
}
})

const fileFilter=(req, file,cb)=>{
    if(file.mimetype==='image/jpeg' ||file.mimetype==='image/png' ){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
   
}
const upload=multer({storage:storage, limits:{
    fileSize: 1024*1024*5
},
fileFilter:fileFilter

})


router.post('/vehicle', verify,  upload.single('carImage'), async (req, res)=>{
    const details=new Details({
        brandname:req.body.brandname,
        modelname:req.body.modelname,
        vehiclenumberplate:req.body.vehiclenumberplate,
        // carImage:req.file.path
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




module.exports=router