
const Appointment = require('../models/appointmentSchema');

// CREATE
exports.createAppointment = async (req, res) => {
  try {
    const {
      lrNo,
      appointmentDate,
      startTime,
      endTime,
      appointmentId,
      poNumber,
      asn
    } = req.body;

    const poCopy = req.file ? `uploads/${req.file.filename}` : null;


    // ✅ Validation: required fields (except appointmentId)
    if (!lrNo || !appointmentDate || !startTime || !endTime || !poNumber || !asn || !poCopy) {
      return res.status(400).json({ message: 'All fields are required except Appointment ID' });
    }

    // ✅ Duplicate LR No Check
    const existing = await Appointment.findOne({ lrNo });  
    if (existing) {
      return res.status(409).json({ message: 'Appointment already exists for this LR No' });
    }

    const newAppointment = new Appointment({
      lrNo,
      appointmentDate,
      startTime,
      endTime,
      appointmentId,
      poNumber,
      asn,
      poCopy : `${poCopy}`,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment created', appointment: newAppointment });
  } catch (error) {   
    console.error('Create Appointment Error:', error);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};  

// READ ALL
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};   

// READ BY ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment' });
  }
};

// UPDATE
exports.updateAppointment = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.poCopy = req.file.path;
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Appointment not found' });

    res.status(200).json({ message: 'Updated successfully', appointment: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

// DELETE
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    await appointment.deleteOne();
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment' });
  }
};


