const express = require("express");
const router = express.Router();

const { enrollInCourse , getMyEnrollments } = require("../controllers/enrollmentController");

router.post("/courses/:courseId/enroll", enrollInCourse);

router.get("/enrollments/me", getMyEnrollments);


module.exports = router;