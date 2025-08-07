const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber } = req.body;
    const id = req.user.id;

    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;

    await profile.save();

    // ✅ Return the updated user with populated profile
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();


    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		})
    
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
// exports.getEnrolledCourses = async (req, res) => {
//     try {
//       const userId = req.user.id
//       const userDetails = await User.findOne({
//         _id: userId,
//       })
//        .populate({
// 		  path: "courses",
// 		  populate: {
// 			path: "courseContent",
// 			populate: {
// 			  path: "subSection",
// 			},
// 		  },
// 		})
//         .exec()
  
  
//       if (!userDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find user with id: ${userDetails}`,
//         })
//       }
//       return res.status(200).json({
//         success: true,
//         data: userDetails.courses,
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
// };
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    // Use .lean() to get plain JS object, faster & avoids toObject() issues
    const userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .lean() // <--- use lean instead of toObject()
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    // Calculate progress and total duration for each course
    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      let subSectionLength = 0;

      const course = userDetails.courses[i];

      if (Array.isArray(course.courseContent)) {
        for (let j = 0; j < course.courseContent.length; j++) {
          const section = course.courseContent[j];

          if (Array.isArray(section.subSection)) {
            totalDurationInSeconds += section.subSection.reduce(
              (acc, curr) => acc + parseInt(curr.timeDuration || 0),
              0
            );
            subSectionLength += section.subSection.length;
          }
        }
      }

      course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);

      const courseProgress = await CourseProgress.findOne({
        courseID: course._id,
        userId: userId,
      }).lean();

      const completedCount = courseProgress?.completedVideos?.length || 0;

      course.progressPercentage =
        subSectionLength === 0
          ? 100
          : Math.round((completedCount / subSectionLength) * 10000) / 100;
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// exports.instructorDashboard = async(req, res) => {
// 	try{
// 		const courseDetails = await Course.find({instructor:req.user.id});

// 		const courseData  = courseDetails.map((course)=> {
// 			const totalStudentsEnrolled = course.studentsEnrolled.length
// 			const totalAmountGenerated = totalStudentsEnrolled * course.price

// 			//create an new object with the additional fields
// 			const courseDataWithStats = {
// 				_id: course._id,
// 				courseName: course.courseName,
// 				courseDescription: course.courseDescription,
// 				totalStudentsEnrolled,
// 				totalAmountGenerated,
// 			}
// 			return courseDataWithStats
// 		})

// 		res.status(200).json({courses:courseData});

// 	}
// 	catch(error) {
// 		console.error(error);
// 		res.status(500).json({message:"Internal Server Error"});
// 	}
// }
exports.instructorDashboard = async (req, res) => {
  try {
    console.log("User in request:", req.user); // debug

    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = Array.isArray(course.studentsEnroled)
        ? course.studentsEnroled.length
        : 0;

      const totalAmountGenerated =
        totalStudentsEnrolled * (course.price || 0);

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        price: course.price,
        thumbnail: course.thumbnail,
        studentsEnroled: totalStudentsEnrolled,
        totalAmountGenerated,
        status: course.status,
        createdAt: course.createdAt,
      };
    });

    res.status(200).json({ success: true, courses: courseData });
  } catch (error) {
    console.error("Instructor dashboard error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
