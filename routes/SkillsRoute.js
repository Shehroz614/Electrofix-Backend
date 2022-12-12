const express = require("express");
const DecodeToken = require("../Middlewares/DecodeToken");
const router = express.Router();
const Skill = require("../models/SkillModel");



// get all skills
router.get("/", (req, res) => {
  const skill = Skill.find()
    // .populate({ path: "user", select: "id fname lname" })
    .then((skill) => res.json(skill))
    .catch((err) => res.json(err));
});




// get all skills of a user with userid
router.get("/userskills/:id", (req, res) => {
  const skill = Skill.findOne({ user: req.params.id })
    .then((skill) => res.json(skill))
    .catch((err) => res.json(err));
});




// get one skill with id
router.get("/:id", (req, res) => {
  const skill = Skill.findById(req.params.id).populate({"path" : "user", "select" : "id fname lname"})
    .then((skill) => res.json(skill))
    .catch((err) => console.log(err));
});




// add a new skill
router.post("/add/", DecodeToken, (req, res) => {
  req.body.user = req.user.id;
  const skill = new Skill(req.body);
  skill
    .save()
    .then((skill) => res.json(skill))
    .catch((err) => res.json(err));
});




// Update skill
router.patch("/update/:id", DecodeToken ,async (req, res) => {
  const skillCheck = await Skill.findById(req.params.id);

  if (skillCheck.user == req.user.id) {
    const skill = Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .then((skill) => res.json(skill))
      .catch((err) => console.log(err));
  } else {
    res.json("Not Authorized");
  }
});

module.exports = router;
