const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const {checkToken} = require("./auth/token_validation")

var app = express();

const unRegisterRoutes = require('./routes/unregister');
const customerRoutes = require('./routes/customer');
const sellerRoutes = require('./routes/seller');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use((req, res, next)=>{
    next();
});
app.use(cors());
app.use("/", unRegisterRoutes);
app.use("/customer", customerRoutes);
app.use("/seller", sellerRoutes);
app.use("*", (req, res)=>{
    res.status(404).json({massage: "Not Found!"});
});
app.use((err, req, res, next)=>{
    res.status(500).json({massage: err.massage});
});


// server port
app.listen(8080, ()=>{
    console.log("Server Started");
});