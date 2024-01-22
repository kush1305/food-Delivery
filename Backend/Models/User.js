const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

//using Mongoose to create a model named 'user' based on a schema called UserSchema. In Mongoose, models are constructors compiled from Schema definitions.

module.exports = mongoose.model('user',UserSchema)