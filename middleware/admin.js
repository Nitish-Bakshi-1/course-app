const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwt_token = words[1];

  const verification = jwt.verify(jwt_token, JWT_SECRET);
  if (!verification) {
    res.json({
      message: "(Admin) authentication failed",
    });
  } else {
    next();
  }
}

module.exports = adminMiddleware;
