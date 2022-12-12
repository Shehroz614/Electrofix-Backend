const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;

const UserScheme = new Schema({
    fname : String,
    lname : String,
    email : String,
    password : String,
    city : String,
    userType : String,
    phone : String,
    DOB : Date,
    dateJoined :{
        type : Date,
        default : Date.now
    },
    rating : String,
    photo : String,
    status : String,
    earning : String,
    spent : String,
    skills : {
        type : [Schema.Types.ObjectId],
        ref : "skill"
    }


})

const User = mongoose.model("user", UserScheme)
module.exports = User