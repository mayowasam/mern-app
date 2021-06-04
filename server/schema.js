const mongoose = require('mongoose')
const AppSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    }, 
    email:{
        type : String,
        required: true,
        unique: true,
    },

    password:{
        type : String,
        required: true,
    },

    gender:{
        type: String,
        required: true,
    },

    status:{
        type: String,
        required: true,
    },
    
},{
    timestamps:true

    })

const Profile = mongoose.model('Profile', AppSchema)

module.exports = Profile