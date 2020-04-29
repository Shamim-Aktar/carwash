const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const expressValidator=require('express-validator')


const app=express()


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log('Database connected')
})


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

//imports routes
const authRoute=require('./routes/auth')
const detailRoute=require('./routes/adddetails')
app.use('/api/user', authRoute)
app.use('/api/details', detailRoute)






const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`server is runingon port ${port}`)
});