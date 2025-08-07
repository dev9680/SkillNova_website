import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const { theme } = useSelector((state) => state.theme) // Assuming you store light/dark theme in Redux

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  const isDark = theme === "dark"

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`my-10 w-11/12 max-w-[700px] rounded-lg border ${
          isDark ? "border-richblack-400 bg-richblack-800" : "border-gray-300 bg-white"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between rounded-t-lg p-5 ${
            isDark ? "bg-richblack-700 text-richblack-5" : "bg-gray-100 text-gray-800"
          }`}
        >
          <p className="text-xl font-semibold">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className={`p-6 ${isDark ? "text-richblack-5" : "text-gray-800"}`}>
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2 mt-4">
              <label className="text-sm" htmlFor="courseExperience">
                Add Your Experience <sup className="text-pink-500">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className={`min-h-[130px] w-full resize-none rounded-md border px-4 py-2 text-sm outline-none transition-all duration-200 ${
                  isDark
                    ? "bg-richblack-700 border-richblack-600 text-richblack-5 placeholder:text-richblack-400"
                    : "bg-white border-gray-300 text-gray-800 placeholder:text-gray-500"
                }`}
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-500">
                  Please Add Your Experience
                </span>
              )}
            </div>

            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold transition-all duration-200 ${
                  isDark
                    ? "bg-richblack-300 text-richblack-900"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
