import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="rounded-lg border border-gray-200 dark:border-richblack-600 bg-white dark:bg-richblack-900 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="rounded-lg">
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`${Height} w-full rounded-t-xl object-cover`}
          />
        </div>
        <div className="flex flex-col gap-2 px-3 py-4">
          <p className="text-lg font-semibold text-gray-900 dark:text-richblack-100">
            {course?.courseName}
          </p>
          <p className="text-sm text-gray-600 dark:text-richblack-300">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-xs text-gray-500 dark:text-richblack-400">
              ({course?.ratingAndReviews?.length || 0} Ratings)
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-richblack-50">
            ₹ {course?.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Course_Card;
