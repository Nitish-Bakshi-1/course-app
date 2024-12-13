const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
      username,
      password,
    }).then((value) => {
      if (value) {
        res.json({
          message: "Admin created successfully",
        });
      } else {
        res.json({
          msg: "unable to signup",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async function (req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const admin = await Admin.findOne({
      username,
      password,
    });
    if (!admin) {
      res.json({
        msg: "admin not found",
      });
    }
    const token = jwt.sign({ username: username }, JWT_SECRET);
    if (token) {
      res.json({
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/courses", adminMiddleware, (req, res) => {
  try {
    const { title, description, price, imageLink } = req.body;

    Course.create({
      title,
      description,
      imageLink,
      price,
    }).then((value) => {
      if (value) {
        res.json({
          msg: "course created successfully",
          courseId: value._id,
        });
      } else {
        res.json({
          msg: "unanle to create course",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
});

module.exports = router;
