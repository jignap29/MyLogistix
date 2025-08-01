
 
const Order = require('../models/orderSchema');


exports.createOrder = async (req, res) => {
  try {
    const {
      pickupPincode,
      deliveryPincode,
      weight,
      qty,
      length,
      width,
      height,
      paymentMode,
      invoiceValue,
      insurance ,
      appointmentDelivery ,
      selectedCourierCompany,
      finalRate,
      zone,
      status
    } = req.body;

    // ✅ Auto-generate LR/AWB No like "LR00001"
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    let nextNumber = 1;

    if (lastOrder && lastOrder.orderId) {
      const lastNumber = parseInt(lastOrder.orderId.replace("LR", ""));
      nextNumber = lastNumber + 1;
    }

    const orderId = "LR" + nextNumber.toString().padStart(5, "0");

    const newOrder = new Order({
      pickupPincode,
      deliveryPincode,
      weight,
      qty,
      length,
      width,
      height,
      paymentMode,
      invoiceValue,
      insurance,
      appointmentDelivery,
      selectedCourierCompany,
      finalRate,
      zone,
      status,
      orderId, // ✅ Set generated orderId here
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal error' });
  }
};




exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};                                                                                             

// 🟣 Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// 🟠 Update order by ID
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order' });
  }
};

// 🔴 Delete order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.deleteOne();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order' });
  }
};

// 🟢 Get total order count
// exports.getOrderCount = async (req, res) => {
//   try {
//     const count = await Order.countDocuments();
//     res.status(200).json({ count });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch order count' });
//   }
// };

exports.getOrderCount = async (req, res) => {
  try {
    // 🔹 Status-wise counts
    const orderCounts = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // 🔹 Convert array to object
    const statusCounts = orderCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // 🔹 Get total orders
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      total: totalOrders,
      pending: statusCounts.pending || 0,
      readytoship: statusCounts.readytoship || 0,
      shipped: statusCounts.shipped || 0,
      delivered: statusCounts.delivered || 0,
      cancelled: statusCounts.cancelled || 0,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch order count' });
  }
};

// 🟡 Update only the status of an order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // ✅ Valid status values
    const allowedStatuses = ['pending', 'ready to ship', 'shipped', 'delivered', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // 🔄 Update status only
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order: updatedOrder
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};





































































