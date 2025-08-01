// const mongoose = require('mongoose');

// const weightReconciliationSchema = new mongoose.Schema({
//   order: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Order',
//     required: true,
//     unique: true
//   },
//   orderId: {
//     type: String,
//     required: true
//   },
//   enteredWeight: Number,       // from Order
//   chargedWeight: Number,       // courier's charged weight
//   discrepancy: Number,         // auto: chargedWeight - enteredWeight
//   appliedAmount: Number,       // from Order (finalRate)
//   chargedAmount: Number,       // courier billed amount
//   status: {
//     type: String,
//     enum: ['Pending', 'Accepted', 'Rejected', 'Dispute Raised'],
//     default: 'Pending'
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: Date
// });

// module.exports = mongoose.model('WeightReconciliation', weightReconciliationSchema);




const mongoose = require('mongoose');

const extraWeightSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  courierCompany: { type: String },
  zone: { type: String },
  enteredWeightKg: { type: Number },
  extraWeightKg: { type: Number },
  additionalRatePerKg: { type: Number },
  weightCharge: { type: Number },
  fuelCharge: { type: Number },
  gst: { type: Number },
  totalExtraCharge: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('ExtraWeight', extraWeightSchema);

