// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: { type: String },
//     lastName: { type: String },
//     gender: { type: String, enum: ['male', 'female'] },
//     birthdate: { type: Date },
//     email: { type: String },
//     phoneNumber: { type: String, required: true, unique: true },
//     otp: { type: String },
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: { type: String, enum: ["male", "female"] },
  birthDate: Date,
  email: String,
  phoneNumber: { type: String, required: true, unique: true },
  otp: String,
});

module.exports = mongoose.model("User", userSchema);
