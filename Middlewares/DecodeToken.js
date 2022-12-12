var jwt = require("jsonwebtoken");
const JWT_Key = "ShehrozToken";

const DecodeToken = (req, res, next) => {
  const Auth_Token = req.header("Auth_Token");
  if (!Auth_Token) {
    res.send("Token Missing");
  } else {
    try {
      const data = jwt.verify(Auth_Token, JWT_Key);
      req.user = data.user;
    } catch (error) {
      res.json("Invalid Token");
    }
  }

  next();
};

module.exports = DecodeToken;
