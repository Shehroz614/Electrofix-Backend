const { default: mongoose} = require("mongoose")
const { Schema } = mongoose;

const orderSchema = new Schema({
    client : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    agent : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    requestDate : {
        type : Date,
        default : Date.now
    },
    status : String,
    payment : String,
    expectedDeliveryDate : Date,
    paymentMethod : String,
    deliveryDate : Date,
    rating : String,
    title : String,
    discription : String
})

const Order = mongoose.model("order", orderSchema);
module.exports = Order;