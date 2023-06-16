const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    role:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('User',userSchema);