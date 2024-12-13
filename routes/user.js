const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
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

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
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
  // Implement course purchase logic
  const id = req.params.courseId;
  const username = req.headers.username;
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

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
