// // models/pickupRequestModel.js
// const mongoose = require('mongoose');

// const pickupRequestSchema = new mongoose.Schema({
//   shippingPartner: {
//     type: String,
//     required: true,
//   },
//   warehouse: {
//     type: String,
//     required: true,
//   },
//   expectedPackageCount: {
//     type: Number,
//     required: true,
//   },
//   pickupDate: {
//     type: Date,
//     required: true,
//   },
//   pickupTime: {
//     type: String, // e.g., "01:00 pm - 03:00 pm"
//     required: true,
//   },
//   center: {
//     type: String,
//   },
//   deliveryPartner: {
//     type: String,
//     default: 'DELHIVERY',
//   },
//   deliveryType: {
//     type: String,
//     enum: ['SMALL', '2KG'],
//     default: 'SMALL',
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('PickupRequest', pickupRequestSchema);


// models/pickupRequestModel.js
const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema({
  shippingPartner: {
    type: String,
    required: true,
  },
  warehouse: {
    type: String,
    required: true,
  },
  expectedPackageCount: {
    type: Number,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },   
  pickupTime: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);  






// const mongoose = require("mongoose");

// const pickupRequestSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   courierCompany: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "CourierCompany",
//   },
//   shippingPartner: {
//     type: String,
//     required: true,
//   },
//   warehouse: {
//     type: String,
//     required: true,
//   },
//   expectedPackageCount: {
//     type: Number,
//     required: true,
//   },
//   pickupDate: {
//     type: Date,
//     required: true,
//   },
//   pickupTime: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("PickupRequest", pickupRequestSchema);


