const User = require("../models/User")
const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course")
const Category = require("../models/Category")
require("dotenv").config()


// admin controllers

exports.mainPageData = async (req, res) => {
    try {
        const students = await User.countDocuments({accountType:"Student"}).exec();
        const instructors = await User.countDocuments({accountType:"Instructor"}).exec();
        const courses = await Course.countDocuments({status: "Published"}).exec();
        const ratingAndReviews = await RatingAndReview.countDocuments({}).exec();

        if(!students || !instructors || !courses || !ratingAndReviews){
            // console.log("error in fetching count data")
            return res.status(500).json({
                success : false,
                message:"count data in not available"
            })
        }

        return res.status(200).json({
            success : true,
            message:"data for mainpage",
            data : {students, instructors, courses, ratingAndReviews}
        })


    } catch (error) {
        // console.log("error in fetching count data", error)
        return res.status(500).json({
                success : false,
                message:"count data in not available"
        })
    }
}

exports.createCategory = async (req, res) => {
    try {
        // console.log("inside category")
		const { name, description } = req.body;
		if (!name || !description) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

        const alreadyCreated = await Category.findOne({name:name})
        if(alreadyCreated){
            return res
				.status(400)
				.json({ success: false, message: "this category already exist" });
        }

		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		// console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Category Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getAllInstructors = async (req, res) => {
    try {
        const allInstructors = await User.find({accountType: "Instructor"}
                
                                                ).select("firstName lastName email image courses").sort({ createdAt: -1 }).exec();;
        if(!allInstructors){
            // console.log("no instructors found");
            return res.status(500).json({
                success : false,
                message : "no instructors found"
            })
        }

        // console.log("instructorData", allInstructors)
        allInstructors.forEach((element, index )=> {
            const totalCourses = element.courses.length
            const newElement = element.toObject();
            newElement.courses = totalCourses;
            allInstructors[index] = newElement;
        });


        return res.status(200).json({
            success : true,
            data : allInstructors
        })
    } catch (error) {
        // console.log(error);

        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        const Students = await User.find({accountType: "Student"})
                                        .select("firstName lastName image email").exec();
        if(!Students){
            // console.log("no students found");
            return res.status(500).json({
                success : false,
                message : "no students found"
            })
        }

        const allStudents = [];
        for (const iterator of Students) {
            const ratingAndReviewsCount = await RatingAndReview.countDocuments({user:iterator._id});
            const enrolledCoursesCount = await Course.countDocuments({ studentsEnrolled : {$elemMatch: {$eq: iterator._id} }});
            const element = iterator.toObject()
            element.ratingAndReviewsCount= ratingAndReviewsCount
            element.enrolledCoursesCount = enrolledCoursesCount
            allStudents.push(element)
        }

        // console.log("alldata",allStudents)

        return res.status(200).json({
            success : true,
            data : allStudents
        })
    } catch (error) {
        // console.log(error);

        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.getAllCoursesDetails = async (req, res) => {
    try {
        const allCourses = await Course.find({status: "Published"},{
                                        courseName:true,
                                        studentsEnrolled:true,
                                        instructor : true,
                                        thumbnail:true,
                                        ratingAndReviews:true,
                                        })
                                        .populate({
                                            path:"instructor",
                                            select : "firstName lastName"
                                        })                                        
                                        .sort({ createdAt: -1 });
        
        if(!allCourses){
            // console.log("no courses found");
            return res.status(500).json({
                success : false,
                message : "no courses found"
            })
        }


        allCourses.forEach((element, index )=> {
            const reviews = element.ratingAndReviews.length
            const students = element.studentsEnrolled.length
            const newElement = element.toObject();
            newElement.studentsEnrolled = students;
            newElement.ratingAndReviews = reviews;

            allCourses[index] = newElement;
        });

        // console.log("allCourses",allCourses)

        return res.status(200).json({
            success : true,
            data : allCourses
        })
    } catch (error) {
        // console.log(error);

        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}






