const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express();
const router= require('./routes/auth')
const docRouter = require('./routes/Doc')
const cookieParser = require('cookie-parser');


app.use(express.json())

app.use(cors({
   origin: process.env.ORIGIN,
   credentials:true,
}))
app.use(cookieParser());

app.use('/',router)
app.use('/',docRouter)


mongoose.connect(process.env.DATABASE_URL).then(()=> {
    app.listen(process.env.PORT,()=> {
        console.log("Server ready to take offf ");
        
    })
}).catch((err) => {
    console.log(err);
    
})








