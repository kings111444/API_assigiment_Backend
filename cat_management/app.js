const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/cat-routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/',router)

mongoose.connect("mongodb+srv://admin:NHMQKFNfTHYbgwvo@cluster0.25kozn1.mongodb.net/?retryWrites=true&w=majority")
    .then(() => 
        app.listen(3002,()=>console.log("Connected and listening to port 3002")))
    .catch(err => console.log(err));