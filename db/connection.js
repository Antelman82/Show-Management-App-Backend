const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost/show-management_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    })

    .catch(error => 
        console.log("Connection Failed", error))

mongoose.Promise = Promise

module.exports = mongoose
