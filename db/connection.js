const mongoose = require('mongoose')

// const mongoURI = 'mongodb://localhost/show-management_db'
let mongoURI = '';
if (process.env.NODE_ENV === "production") {
    mongoURI = process.env.MONGODB_URI;
  } else {
    mongoURI = 'mongodb://localhost/show-management_db';
  }

mongoose.connect(mongoURI, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false })

.catch(error => console.log("Connection Failed", error))

mongoose.Promise = Promise

module.exports = mongoose
