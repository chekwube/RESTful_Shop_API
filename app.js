const express = require('express');
const app = express();
const productsRoute = require('./api/routes/product')
const ordersRoute = require('./api/routes/orders')
const morgan = require('morgan');

app.use(morgan('dev'))

//Routes which handle request
app.use('/products', productsRoute)
app.use('/orders', ordersRoute)

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