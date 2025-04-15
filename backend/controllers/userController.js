const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate OTP
const getOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  let user = await User.findOne({ phoneNumber });
  if (user) {
    user.otp = otp;
    await user.save();
  } else {
    user = await User.create({ phoneNumber, otp });
  }

  res.status(200).json({ message: "OTP sent successfully", otp }); // Don't send OTP in production
};

// Verify OTP and create JWT
const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;
  const user = await User.findOne({ phoneNumber, otp });

  if (!user) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Create JWT with userId
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.status(200).json({
    message: "OTP verified successfully",
    token,
    user,
  });
};

// Complete profile
const completeProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(400).json({ message: "User not found in request" });

    const {
      firstName, lastName, gender, birthDate, email, phoneNumber,
    } = req.body;

    user.firstName = firstName;
    user.lastName = lastName;
    user.gender = gender;
    user.birthDate = birthDate;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();
    res.status(200).json({ message: "Profile completed successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getDashboard = (req, res) => {
  res.status(200).json({ message: "Welcome to dashboard", user: req.user });
};

module.exports = {
  getOtp,
  verifyOtp,
  completeProfile,
  getDashboard,
};
