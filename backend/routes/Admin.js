// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions

const {sendAdminOtp,
    adminSignUp,
    adminLogin} = require("../controllers/Auth");

const {
    authAdmin, 
    isAdmin} = require("../middlewares/auth");

const {
    mainPageData,
    createCategory,
    getAllStudents, 
    getAllInstructors, 
    getAllCoursesDetails, 
} = require("../controllers/Admin");


// ********************************************************************************************************
//                                      Admin Routes
// ********************************************************************************************************


// Route for sending OTP to the admin's email
// this route is only accessable by backend
router.post("/sendotp", sendAdminOtp)

// Route for admin signUp
// this route is only accessable by backend
router.post("/signUp", adminSignUp)






// Route for admin login
router.post("/login", adminLogin)

// Route for getting mainPageData
router.get("/mainPageData", authAdmin, isAdmin , mainPageData)

// Route for creating category
router.post("/createCategory", authAdmin, isAdmin, createCategory)

// Route for getting all students
router.get("/allStudents", authAdmin, isAdmin, getAllStudents)

// Route for getting all instructors
router.get("/allInstructors", authAdmin, isAdmin, getAllInstructors)

// Route for getting all coursedetails
router.get("/allCourses", authAdmin, isAdmin, getAllCoursesDetails)

// Export the router for use in the main application
module.exports = router
