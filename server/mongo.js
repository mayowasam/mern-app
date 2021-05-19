const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/myfirstcrudapp'


module.exports = () => {

    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log('mongodb is connected');
        })
        .catch(err => {
            console.log(err)
        })

    mongoose.connection.on('connected', () => {
        console.log('mongoose is conneted to db');
    })

    mongoose.connection.on('error', err => {
        console.log(err);
    })

    mongoose.connection.on('disconnected', () => {
        console.log('mongoose is disconnected');
    })

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('mongoose closed when i pressed ctrl c');
            process.exit(0)
        })
    })
}

