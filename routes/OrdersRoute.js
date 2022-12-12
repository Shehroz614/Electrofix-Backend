const express = require("express");
const DecodeToken = require("../Middlewares/DecodeToken");
const router = express.Router();
const Order = require("../models/OrderModel");

// get all orders
router.get("/", (req, res) => {
  const order = Order.find()
    .populate({ path: "client", select: "fname lname id" })
    .populate({ path: "agent", select: "fname lname id" })
    .then((order) => res.json(order))
    .catch((err) => res.json(err));
});

//get all orders of a user with auth token
router.get("/userorders", DecodeToken, (req, res) => {
  //const order = Order.find({$or [ {client : req.user.id}, {agent : req.user.id}]})
  const order = Order.find()
    .or({ client: req.user.id }, { agent: req.user.id })
    .populate({ path: "client", select: "fname lname id" })
    .populate({ path: "agent", select: "fname lname id" })
    .then((order) => res.json(order))
    .catch((err) => res.json(err));
});

// add a new request
router.post("/new/request/", DecodeToken , (req, res) => {
 if(req.user.id===req.body.client)
  {
    const order = new Order(req.body);
  order
    .save()
    .then((order) => res.json(order))
    .catch((err) => res.json(err)); 
  }
  else{
    res.json("Not Authorized")
  }
});

// Update request --- accept ot reject ot complete etc
router.patch("/update/:id", (req, res) => {
  const order = Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((order) => res.json(order))
    .catch((err) => console.log(err));
});

// get one order
router.get("/:id", (req, res) => {
  const order = Order.findById(req.params.id)
    .populate({ path: "client", select: "fname lname id" })
    .populate({ path: "agent", select: "fname lname id" })
    .then((order) => res.json(order))
    .catch((err) => console.log(err));
});

module.exports = router;
