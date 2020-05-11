const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const expressValidator=require('express-validator')
var cors = require('cors')


const app=express()


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log('Database connected')
})


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use(expressValidator())
app.use('uploads', express.static('uploads'))

//imports routes
const authRoute=require('./routes/auth')
const detailRoute=require('./routes/adddetails')
const orderRoute=require('./routes/order')
app.use('/api/user', authRoute)
app.use('/api/details', detailRoute)
app.use('/api/', orderRoute)






const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`server is runingon port ${port}`)
});