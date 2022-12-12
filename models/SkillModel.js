const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;

const skillScheme = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : "user"
    },
    skill : String,
    experience : String,
    cirtification : Boolean,
    cirName : String,
    cirFrom : String,
    cirYear : String
})

const Skill = mongoose.model("skill",skillScheme);
module.exports = Skill; 