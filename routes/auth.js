const express=require('express')
const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const {registerValidation, loginValidation}=require('../validation')

const router=express.Router()


//validation
//const Joi=require('@hapi/joi')

// const schema={
//     name:Joi.string().min(6).required(),
//     email:Joi.string().min(6).required().email(),
//     password:Joi.string().min(6).required()
// }

// const schema = Joi.object({ name: Joi.string() .min(6) .required(),
//     email: Joi.string() .min(6) .required() .email(),
//     password: Joi.string() .min(6) .required() });

router.post('/register', async (req, res)=>{
     const {error}=registerValidation(req.body)
     if(error) return res.status(400).send(error.details[0].message);

     const emailExist=await User.findOne({email:req.body.email})
     if(emailExist) return res.status(400).send('email already exist')

     //hashing
     const salt=await bcrypt.genSalt(10)
     const hashedPassword=await bcrypt.hash(req.body.password, salt)
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword

    });
    try{
        const savedUser=await user.save();
        //res.send(savedUser)
        res.send({user:user._id})
    } catch(err){
        res.status(400).send(err)
    }
})

router.post('/login',async  (req, res)=>{
    const {error}=loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('email and password combination is wrong')

    //password is correct

    const validPass=await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    const token=jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send(token)

    //res.send('I am login ')
})

router.get('/userprofile/:id', (req, res)=>{
    User.findById(req.params.id,(error, data)=>{
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                profile: data
            })
        }
    })
})

router.put('/updateprofile/:id',(req, res)=>{
    User.findByIdAndUpdate(req.params.id, {$set: req.body},
        (error, data)=>{
            if (error) {
                return next(error);
                //console.log(error)
            } else {
                res.status(200).json({
                    data
                })
            }
        }
        )
})

module.exports=router