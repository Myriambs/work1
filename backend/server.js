require('dotenv').config();
const express = require ('express')
const bodyParser = require('body-parser');


const app = express()

const port = process.env.port
const cors= require('cors')
const connectdb = require ('./config/db')
const userRoutes = require('./routes/authRoute');
const userAgence= require('./routes/authAgence');
const carRoutes = require('./routes/carRoutes');
const payRoute=require('./routes/payRoute')
const rentalRoutes=require('./routes/rentalRoutes')
const reviewRoutes= require('./routes/reviewRoutes')
connectdb()
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes);
app.use('/agence',userAgence)
app.use('/car',carRoutes)
app.use('/pay',payRoute)
app.use('/rental',rentalRoutes)
app.use('/review',reviewRoutes)
 













app.listen(port,err=>{
    err?console.log(err):console.log(`go to the port => ${port}`)
})