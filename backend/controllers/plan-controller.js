// const Plan = require('../models/planSchema.js');

// // Create a new plan
// const planCreate = async (req, res) => {
//     try {
//         // Destructure required fields from the request body
//         const { planname, amount, activated } = req.body;

//         // Create a new plan object
//         const plan = new Plan({
//             planname,
//             amount,
//             activated
//         });

//         // Save the plan to the database
//         const result = await plan.save();

//         // Send the response with the saved plan
//         res.status(201).send(result);
//     } catch (err) {
//         res.status(500).json({ message: "Error creating plan", error: err });
//     }
// };

// // Get all plans
// const planList = async (req, res) => {
//     try {
//         // Find all plans
//         let plans = await Plan.find();

//         // Check if any plans were found
//         if (plans.length > 0) {
//             res.status(200).send(plans);
//         } else {
//             res.status(404).send({ message: "No plans found" });
//         }
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching plans", error: err });
//     }
// };

// // Update a plan
// const updatePlan = async (req, res) => {
//     try {
//         const planId = req.params.id;
//         const { planname, amount, activated } = req.body;

//         // Update the plan with the given ID
//         const result = await Plan.findByIdAndUpdate(
//             planId,
//             { 
//                 $set: { 
//                     planname, 
//                     amount, 
//                     activated 
//                 } 
//             },
//             { new: true }  // Return the updated document
//         );

//         // If plan is found and updated, return the updated plan
//         if (result) {
//             res.status(200).send(result);
//         } else {
//             res.status(404).send({ message: "Plan not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating plan", error });
//     }
// };

// // Delete a specific plan
// const deletePlan = async (req, res) => {
//     try {
//         const planId = req.params.id;

//         // Delete the plan with the given ID
//         const result = await Plan.findByIdAndDelete(planId);

//         // If plan is found and deleted, return the result
//         if (result) {
//             res.status(200).send({ message: "Plan deleted successfully", result });
//         } else {
//             res.status(404).send({ message: "Plan not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting plan", error });
//     }
// };

// // Delete all plans (this can be used for any batch deletion logic if needed)
// const deletePlans = async (req, res) => {
//     try {
//         // Delete all plans
//         const result = await Plan.deleteMany();

//         // If no plans were deleted, send a message
//         if (result.deletedCount === 0) {
//             res.status(404).send({ message: "No plans found to delete" });
//         } else {
//             res.status(200).send({ message: "Plans deleted successfully", result });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting plans", error });
//     }
// };

// module.exports = { planCreate, planList, updatePlan, deletePlan, deletePlans };



const Plan = require('../models/planSchema.js');

// ✅ Create a new plan
const planCreate = async (req, res) => {
    try {
        const {
            name,
            price,
            baseRate,
            docketCharge,
            minCharge,
            odaCharge,
            appointmentDeliveries,
            integrations,
            whatsappUpdates,
            prioritySupport,
            ndrCallSetup,
            additionalUsers,
            isActive // ✅ Added isActive to destructure from req.body
        } = req.body;

        const plan = new Plan({
            name,
            price,
            baseRate,
            docketCharge,
            minCharge,
            odaCharge,
            appointmentDeliveries,
            integrations,
            whatsappUpdates,
            prioritySupport,
            ndrCallSetup,
            additionalUsers,
            isActive // ✅ Save isActive
        });

        const result = await plan.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(500).json({ message: "Error creating plan", error: err.message });
    }
};

// ✅ Get all plans
const planList = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.status(200).send(plans);
    } catch (err) {
        res.status(500).json({ message: "Error fetching plans", error: err.message });
    }
};

// ✅ Update a specific plan
const updatePlan = async (req, res) => {
    try {
        const planId = req.params.id;
        const updatedPlan = await Plan.findByIdAndUpdate(planId, req.body, { new: true });

        if (updatedPlan) {
            res.status(200).send(updatedPlan);
        } else {
            res.status(404).send({ message: "Plan not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating plan", error: error.message });
    }
};

// ✅ Delete a specific plan
const deletePlan = async (req, res) => {
    try {
        const planId = req.params.id;
        const result = await Plan.findByIdAndDelete(planId);

        if (result) {
            res.status(200).send({ message: "Plan deleted successfully", result });
        } else {
            res.status(404).send({ message: "Plan not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting plan", error: error.message });
    }
};

// ✅ Delete all plans
const deletePlans = async (req, res) => {
    try {
        const result = await Plan.deleteMany();
        res.status(200).send({ message: "All plans deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Error deleting plans", error: error.message });
    }
};

module.exports = {
    planCreate,
    planList,
    updatePlan,
    deletePlan,
    deletePlans
};
