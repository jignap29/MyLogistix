// const mongoose = require("mongoose");

// const planSchema = new mongoose.Schema({
//     planname: {
//         type: String,
//         required: true
//     },
//     amount: {
//         type: Number,  // Changed to Number to better represent amounts
//         required: true
//     },
//     activated: {
//         type: Boolean,
//         default: true  // Default to true assuming the plan is activated when created
//     },
// }, { timestamps: true });

// module.exports = mongoose.model("Plan", planSchema);


const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Plan Name (e.g., Basic, Pro)
  price: { type: Number, required: true }, // Plan Price (₹)
  baseRate: { type: Number, required: true }, // Base Rate (₹)
  docketCharge: { type: Number, required: true }, // Docket Charge (%)
  minCharge: { type: Number, required: true }, // Minimum Charge (₹)
  odaCharge: { type: Number, required: true }, // ODA Charge (₹)
  appointmentDeliveries: { type: Number, required: true }, // Appointment Deliveries (₹)
  integrations: { type: Boolean, default: false }, // Integrations
  whatsappUpdates: { type: Boolean, default: false }, // WhatsApp Updates
  prioritySupport: { type: Boolean, default: false }, // Priority Support
  ndrCallSetup: { type: Boolean, default: false }, // Free NDR Call Setup
  additionalUsers: { type: Number, required: true }, // Additional Users (Count)
  
  // ✅ New Field: Active or not
  isActive: { type: Boolean, default: true }, // Plan Activation Status

}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
