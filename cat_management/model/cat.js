const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const catSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    weight:{
        type:String,
        required:true,
    },
    breed:{
        type:String,
        required:true,
    },

});

module.exports = mongoose.model('Cat',catSchema);