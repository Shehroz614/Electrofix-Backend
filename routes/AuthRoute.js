const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const JWT_Key = "ShehrozToken";
const DecodeToken = require("../Middlewares/DecodeToken");

// create a User
router.post(
  "/",
  [
    // Validation for fields
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("fname").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check if the user already exists
    const checkUser = await User.find({ email: req.body.email });
    if (checkUser.length) {
      res.json("User Already Exists");
    } else {
      //Using Bcrypt for Password Hashing
      const salt = await bcrypt.genSalt(5);
      req.body.password = await bcrypt.hash(req.body.password, salt);

      // Creation of new User
      const user = new User(req.body);
      user
        .save()
        .then((user) => {
          // Create and Send JWT Token
          const data = {
            user: {
              id: user.id,
            },
          };

          const Auth_Token = jwt.sign(data, JWT_Key);
          res.json(Auth_Token);
        })
        .catch((err) => console.log(err));
    }
  }
);

//  Get all Users
router.get("/", (req, res) => {
  const user = User.find()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

//get user when Login
router.post("/Signin", (req, res) => {
  const user = User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.json("Invalid email");
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result) {
            {
              // Create and Send JWT Token
              const data = {
                user: {
                  id: user.id,
                },
              };

              const Auth_Token = jwt.sign(data, JWT_Key);
              res.json(Auth_Token);
            }
          } else {
            res.json("Invalid credentials");
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// Update user
router.patch("/update/", DecodeToken, (req, res) => {
  if (req.user) {
    const user = User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    })
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  }
});

// Get one user details with id
router.get("/getUser/:id", (req, res) => {
  const user = User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

// Get one user details with AuthToken
router.get("/getUser", DecodeToken, (req, res) => {
  if (req.user) {
    const user = User.findById(req.user.id)
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  }
});

module.exports = router;
