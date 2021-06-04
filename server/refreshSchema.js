const mongoose = require('mongoose')
const RefreshSchema = mongoose.Schema({
    refreshToken:{
        type:String,
        required: true,
        ref: 'Profile'
    }

    })

const TokenRefresh = mongoose.model('RefreshToken', RefreshSchema)

module.exports = TokenRefresh