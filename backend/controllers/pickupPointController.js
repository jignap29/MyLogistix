const PickupPoint = require('../models/pickupPointSchema');

// Create
exports.createPickupPoint = async (req, res) => {
  try {
    const pickup = await PickupPoint.create(req.body);
    res.status(201).json(pickup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.getAllPickupPoints = async (req, res) => {
  try {
    const pickups = await PickupPoint.find().sort({ createdAt: -1 });
    res.status(200).json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updatePickupPoint = async (req, res) => {
  try {
    const pickup = await PickupPoint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(pickup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deletePickupPoint = async (req, res) => {
  try {
    await PickupPoint.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pickup point deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Toggle status
exports.toggleStatus = async (req, res) => {
  try {
    const pickup = await PickupPoint.findById(req.params.id);
    pickup.status = !pickup.status;
    await pickup.save();
    res.status(200).json(pickup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
