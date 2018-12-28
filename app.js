const express = require('express')
const app = express();
const productsRoute = require('./api/routes/product')
const ordersRoute = require('./api/routes/orders')
const userRoute = require('./api/routes/user')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect to the database
// mongoose.connect('mongodb+srv://cheks:'+ process.env.MONGO_ATLAS_PW +'@cluster0-1p6if.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
mongoose.connect('mongodb://cheks:okekejulios1.@ds029705.mlab.com:29705/cheks', { useNewUrlParser: true })

mongoose.Promise = global.Promise;
app.use('/uploads',express.static('uploads'))
app.use(morgan('dev'))

//Routes which handle request
app.use('/products', productsRoute)
app.use('/orders', ordersRoute)
app.use('/users', userRoute)
app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;