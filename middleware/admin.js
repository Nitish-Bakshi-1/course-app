const { Admin } = require("../db/index.js");

// Middleware for handling auth

function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.findOne({
    username,
    password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      res
        .json({
          message: "admin not found",
          success: false,
        })
        .status(403);
    }
  });
}

module.exports = adminMiddleware;