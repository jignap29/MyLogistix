const express = require("express");
const router = express.Router();
const {
  getOtp,
  verifyOtp,
  completeProfile,
  getDashboard
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/get-otp", getOtp);
router.post("/verify-otp", verifyOtp);
router.post("/complete-profile", authMiddleware, completeProfile);
router.get("/dashboard", authMiddleware, getDashboard);

module.exports = router;
