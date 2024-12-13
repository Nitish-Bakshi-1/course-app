const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../index.js");

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwt_token = words[1];

  const verification = jwt.verify(jwt_token, JWT_SECRET);
  if (!verification.username) {
    res.json({
      message: "(Admin) authorization failed",
    });
  } else {
    next();
  }
}

module.exports = userMiddleware;
