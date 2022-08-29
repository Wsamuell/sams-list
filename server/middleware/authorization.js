const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // destructure token
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("You are not Authorized");
    }
    const payload = jwt.verify(jwtToken, process.env.jwtToken);
    req.user = payload.user;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("You are not Authorized");
  }
};
