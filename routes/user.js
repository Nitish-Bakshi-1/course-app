const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.create({
    username,
    password,
  }).then((value) => {
    if (value) {
      res.json({
        msg: "user created",
      });
    } else {
      res.json({
        msg: "user not created",
      });
    }
  });
});

router.post("/signin", async function (req, res) {
  const { username, password } = req.body;

  const user = await User.findOne(username, password);
  if (user) {
    const token = jwt.sign({ username: username }, JWT_SECRET);

    if (!token) {
      res.json({
        messge: "no token",
      });
      res.json({ token });
    }
  } else {
    res.json({
      message: "user not found",
    });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const response = await Course.find();
    res.json({
      courses: response,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const id = req.params.courseId;
  const username = req.username;
  const user = await User.updateOne(
    {
      username,
    },
    {
      $push: {
        purchasedCourses: id,
      },
    }
  );
  res.json({
    msg: "purchase completed",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    courses,
  });
});

module.exports = router;
