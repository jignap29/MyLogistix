const express = require('express');
const router = express.Router();

const { upload } = require('../middleware/uploadmulter.js');
const {companylogoupload} = require('../middleware/companylogomulter'); // NO destructuring
const {csvUpload} = require('../middleware/companylogomulter.js')
const { createOrder,getAllOrders,getOrderById, updateOrder, deleteOrder,getOrderCount,updateOrderStatus } = require('../controllers/order-controller.js');
const { calculateCourierRates } = require('../controllers/calculateCourierRates-controller');
const { calculateB2BCourierRate } = require('../utils/calculateRate.js');
const {
  createPickupPoint,
  getAllPickupPoints,
  updatePickupPoint,
  deletePickupPoint,
  toggleStatus
} = require('../controllers/pickupPointController');

const { generateAllCourierInvoices } = require('../controllers/invoice-controller');

// b2b courier rate

const b2bRateController = require('../controllers/b2bcourierrate-controller.js');

// wallet
const { rechargeWallet, debitWallet, refundWallet, getWallet, getAllWallets } = require('../controllers/walletController.js');

// pickup request
const {
  createPickupRequest,
  getAllPickupRequests,
  getPickupRequestById,
  updatePickupRequest,
  deletePickupRequest,
} = require('../controllers/pickupRequestController');

// calculate for b2b courier rate
const smartRateController = require('../controllers/b2bSmartRateCalculator.js');

// KYC
const { createKYC, getAllKYC, updateKYCStatus, deleteKYC } = require('../controllers/kycController.js');

// NDR & Exception
const {
  createNdrException,
  getAllNdrExceptions,
  updateNdrException,
  deleteNdrException
} = require('../controllers/ndrExceptionController.js');

// support ticket
const supportController = require("../controllers/supportController.js");
const uploadSupportDoc = require("../middleware/uploadMiddlewareSupport.js");


// Admin
const { adminRegister, adminLogIn, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

// Student
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance
} = require('../controllers/student_controller.js');

// Teacher
const {
    teacherRegister,
    teacherLogIn,
    getTeachers,
    getTeacherDetail,
    deleteTeachers,
    deleteTeachersByClass,
    deleteTeacher,
    updateTeacherSubject,
    teacherAttendance
} = require('../controllers/teacher-controller.js');                

// Notice
const {
    noticeCreate,
    noticeList,
    deleteNotices,
    deleteNotice,
    updateNotice,
    noticeWithTokens,
    noticeWithTokenByPhone
} = require('../controllers/notice-controller.js');

// Plan
const {
    planCreate,
    planList,
    updatePlan,
    deletePlan,
    deletePlans
} = require('../controllers/plan-controller.js');

// Complain
const {
    complainCreate,
    complainList
} = require('../controllers/complain-controller.js');

// Sclass
const {
    sclassCreate,
    sclassList,
    deleteSclass,
    deleteSclasses,
    getSclassDetail,
    getSclassStudents
} = require('../controllers/class-controller.js');             

// Subject
const {
    subjectCreate,
    classSubjects,
    deleteSubjectsByClass,
    getSubjectDetail,
    deleteSubject,
    freeSubjectList,
    allSubjects,
    deleteSubjects
} = require('../controllers/subject-controller.js');

// Courier Company
const {
    createCourierCompany,
     couriercompanyList,
     getCourierCompanyById,
     updateCourierCompany,
     deleteCourierCompany,
} = require('../controllers/couriercompany-controller.js');

// courier-rate
const {
  createCourierRate,
  courierRateList,
  updateCourierRate,
  deleteCourierRate
} = require('../controllers/courierrate-controller');   



const {
 uploadCourierRatesCSV,
  downloadCourierRatesCSV,
} = require('../controllers/courierrate-controller.js');

// weight reconsilation
const {
  reconcileWeight,
  getAllExtraWeights,
  deleteExtraWeightByOrderId
} = require("../controllers/reconciliationController.js");

// appointment 
const appointmentController = require('../controllers/appointmentController.js');



// ======================== ROUTES =========================

// Admin Routes
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail);
router.put("/Admin/:id", updateAdmin);

// Student Routes
router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn);
router.get("/Students/:id", getStudents);
router.get("/Student/:id", getStudentDetail);
router.delete("/Students/:id", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);
router.put("/Student/:id", updateStudent);
router.put('/UpdateExamResult/:id', updateExamResult);
router.put('/StudentAttendance/:id', studentAttendance);
router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);
router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

// Teacher Routes
router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn);
router.get("/Teachers/:id", getTeachers);
router.get("/Teacher/:id", getTeacherDetail);
router.delete("/Teachers/:id", deleteTeachers);
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);
router.put("/TeacherSubject", updateTeacherSubject);
router.post('/TeacherAttendance/:id', teacherAttendance);

// Notice Routes
router.post('/NoticeCreate', noticeCreate);
router.get('/NoticeList/:id', noticeList);
router.get('/NoticeWithTokens', noticeWithTokens);
router.get('/NoticeWithTokenByPhone/:phoneNumber', noticeWithTokenByPhone);
router.delete("/Notices/:id", deleteNotices);
router.delete("/Notice/:id", deleteNotice);
router.put("/Notice/:id", updateNotice);



// Complain Routes
router.post('/ComplainCreate', complainCreate);
router.get('/ComplainList/:id', complainList);

// Sclass Routes
router.post('/SclassCreate', sclassCreate);
router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail);
router.get("/Sclass/Students/:id", getSclassStudents);
router.delete("/Sclasses/:id", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

// Subject Routes
router.post('/SubjectCreate', subjectCreate);
router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);
router.delete("/Subject/:id", deleteSubject);
router.delete("/Subjects/:id", deleteSubjects);



// Plan Routes
router.post('/PlanCreate', planCreate);
router.get('/PlanList', planList);
router.delete("/Plans/:id", deletePlans);
router.delete("/Plan/:id", deletePlan);
router.put("/Plan/:id", updatePlan);


// couriercompany 
router.post(
    '/CourierCompanyCreate',
    upload.fields([
        { name: 'companyLogo', maxCount: 1 },
        { name: 'cancelledChequeImage', maxCount: 1 },
        { name: 'idProof', maxCount: 1 },
    ]),
    createCourierCompany
);

router.get('/CourierCompanyList', couriercompanyList);

// router.put(
//     '/CourierCompany/:id',
//     upload.fields([
//         { name: 'companyLogo', maxCount: 1 },
//         { name: 'cancelledChequeImage', maxCount: 1 },
//         { name: 'idProof', maxCount: 1 },
//     ]),
//     updateCourierCompany
// );

router.post(
  '/CourierCompany/update/:id',
  upload.fields([
    { name: 'companyLogo', maxCount: 1 },
    { name: 'idProof', maxCount: 1 },
    { name: 'cancelledChequeImage', maxCount: 1 },
  ]),
  updateCourierCompany
);

router.delete('/CourierCompany/:id', deleteCourierCompany);


// courier-rate
router.post(
  '/CourierRateCreate',
  companylogoupload.fields([{ name: 'companiesLogo', maxCount: 1 }]),
  createCourierRate
);

router.get('/CourierRateList',   courierRateList,);


router.put(
  '/CourierRate/:id',
  companylogoupload.fields([{ name: 'companiesLogo', maxCount: 1 }]),
  updateCourierRate
);

router.delete('/CourierRate/:id', deleteCourierRate);

router.post(
  '/UploadCourierRatesCSV',
  csvUpload.single('file'),
  uploadCourierRatesCSV
);

router.get('/DownloadCourierRatesCSV', downloadCourierRatesCSV);   

// order
router.post('/create-order', createOrder);
router.post('/calculate-rates', calculateCourierRates);
router.get('/orderList', getAllOrders);

router.put('/order/:id',  updateOrder);

router.delete('/order/:id', deleteOrder);
router.get('/order/count', getOrderCount);

router.patch('/order/:id/status', updateOrderStatus);



router.get('/generate-invoices', generateAllCourierInvoices);  

// b2bcourier rate schema
router.post('/b2b-rates', b2bRateController.createB2BCourierRate);
router.get('/b2b-rates', b2bRateController.getAllB2BCourierRates);
router.get('/b2b-rates/:name', b2bRateController.getB2BCourierRateByCourier);
router.put('/b2b-rates/:id', b2bRateController.updateB2BCourierRate);
router.delete('/b2b-rates/:id', b2bRateController.deleteB2BCourierRate);


router.post('/b2b/calculate-rate', async (req, res) => {
  try {
    const { companyId, pickupPincode, deliveryPincode, weight } = req.body;

    if (!companyId || !pickupPincode || !deliveryPincode || !weight) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await calculateB2BCourierRate(companyId, pickupPincode, deliveryPincode, weight);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/b2b-smart-calculate', smartRateController.calculateSmartB2BRate);


// wallete route  
router.post('/recharge', rechargeWallet);
router.post('/debit', debitWallet);
router.post('/refund', refundWallet);
router.get('/wallet', getWallet);
router.get('/wallets', getAllWallets);

// pickup points 
router.post('/createpickup', createPickupPoint);
router.get('/allpickup', getAllPickupPoints);
router.put('/:id', updatePickupPoint);
router.delete('/:id', deletePickupPoint);
router.patch('/status/:id', toggleStatus);

// pickup request
router.post('/createpickupreq', createPickupRequest);
router.get('/pickupreq', getAllPickupRequests);
router.put('/:id', updatePickupRequest);
router.delete('/delete/:id', deletePickupRequest);

// weight reconsilation
router.post('/weight', reconcileWeight);
router.get('/reconciliation/list', getAllExtraWeights);
router.delete('/reconciliation/:orderId', deleteExtraWeightByOrderId);  

// KYC
router.post(
  '/submit-kyc',
  upload.fields([
    { name: 'documentOne', maxCount: 1 },
    { name: 'documentTwo', maxCount: 1 }
  ]),
  createKYC
);
router.get('/getallKYC', getAllKYC);
router.patch('/update-status/:id', updateKYCStatus); 
router.delete('/kyc/:id', deleteKYC);

// NDR & Exception
router.post('/createNDRException', createNdrException);
router.get('/getallNDR', getAllNdrExceptions);
router.put('/updateNDR/:id', updateNdrException);
router.delete('/deleteNDR/:id', deleteNdrException);      

// appointment
router.post('/addappointment', upload.single('poCopy'), appointmentController.createAppointment);   
router.get('/allappointment', appointmentController.getAllAppointments);
router.get('/apointmentbyid/:id', appointmentController.getAppointmentById);
router.put('/updateapointment/:id', upload.single('poCopy'), appointmentController.updateAppointment);
router.delete('/deleteapointment/:id', appointmentController.deleteAppointment);

// support ticket
router.post("/create", uploadSupportDoc.single("file"), supportController.createTicket);                      
router.get("/all", supportController.getTickets);
router.get("/:ticketId", supportController.getTicketById);
router.post("/reply/:ticketId", uploadSupportDoc.single("file"), supportController.replyToTicket);          
router.patch("/status/support/:ticketId", supportController.changeStatus);
router.delete("/deleteticket/:id", supportController.deleteTicket);

module.exports = router;     