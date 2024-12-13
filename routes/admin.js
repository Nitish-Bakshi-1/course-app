const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
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

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
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
  // Implement fetching all courses logic
  const courses = await Course.find();

  res.json(courses);
});

module.exports = router;
