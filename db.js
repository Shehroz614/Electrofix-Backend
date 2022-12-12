const mongoose= require('mongoose');

const mongoURI ="mongodb://localhost:27017/Electrofix";

const connectMongo =() => {
    mongoose.connect(mongoURI,() =>
    {
        console.log("Connected to mongo successfully.");
    })
}

module.exports = connectMongo; 