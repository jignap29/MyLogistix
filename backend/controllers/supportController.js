// controllers/supportController.js
const SupportTicket = require("../models/supportTicketSchema");

// Create a support ticket
exports.createTicket = async (req, res) => {
  try {
    const {
      userType,
      customerId,
      courierCompanyId,
      category,
      subCategory,
      subject,
      description,
    } = req.body;

    if (!userType || !["customer", "courier"].includes(userType)) {
      return res.status(400).json({ message: "userType must be 'customer' or 'courier'" });
    }

    if (userType === "customer" && !customerId) {
      return res.status(400).json({ message: "customerId is required" });
    }

    if (userType === "courier" && !courierCompanyId) {
      return res.status(400).json({ message: "courierCompanyId is required" });
    }

    const file = req.file ? req.file.filename : null;

    const last = await SupportTicket.findOne().sort({ ticketId: -1 });
    const newTicketId = last ? last.ticketId + 1 : 100000;

    const newTicket = await SupportTicket.create({
      ticketId: newTicketId,
      userType,
      customerId: userType === "customer" ? customerId : null,
      courierCompanyId: userType === "courier" ? courierCompanyId : null,
      category,
      subCategory,
      subject,
      description,
      file,
    });

    res.status(201).json({ message: "Ticket created", data: newTicket });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all tickets (optionally filter by userType/customerId/courierCompanyId)
exports.getTickets = async (req, res) => {
  try {
    const { userType, customerId, courierCompanyId } = req.query;
    const filter = {};

    if (userType) filter.userType = userType;
    if (customerId) filter.customerId = customerId;
    if (courierCompanyId) filter.courierCompanyId = courierCompanyId;

    const tickets = await SupportTicket.find(filter)
      .populate("customerId", "name email mobile")
      .populate("courierCompanyId", "companyName contactPerson")
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Fetch Tickets Error:", error);
    res.status(500).json({ message: "Internal error" });
  }
};

// Get a single ticket by ticketId
exports.getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await SupportTicket.findOne({ ticketId })
      .populate("customerId", "name email mobile")
      .populate("courierCompanyId", "companyName contactPerson");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Fetch Ticket Error:", error);
    res.status(500).json({ message: "Internal error" });
  }
};

// Reply to a ticket
exports.replyToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { message, repliedBy } = req.body;
    const file = req.file ? req.file.filename : null;

    const ticket = await SupportTicket.findOne({ ticketId });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.replies.push({
      message,
      repliedBy: repliedBy || "admin",
      attachment: file,
    });

    await ticket.save();
    res.status(200).json({ message: "Reply added", ticket });
  } catch (error) {
    console.error("Reply Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update ticket status
exports.changeStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    if (!["Open", "Pending", "Closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await SupportTicket.findOneAndUpdate(
      { ticketId },
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json({ message: "Status updated", updated });
  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete ticket
// Delete ticket
exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    // Convert id to number to match ticketId type in schema
    const ticketId = Number(id);

    if (isNaN(ticketId)) {
      return res.status(400).json({ message: "Invalid ticketId format" });
    }

    const deleted = await SupportTicket.findOneAndDelete({ ticketId });

    if (!deleted) return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


