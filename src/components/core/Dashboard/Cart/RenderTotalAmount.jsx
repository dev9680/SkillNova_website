import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border border-gray-300 dark:border-richblack-700 bg-white dark:bg-richblack-800 p-6 shadow-sm dark:shadow-none">
      <p className="mb-1 text-sm font-medium text-gray-700 dark:text-richblack-300">
        Total:
      </p>
      <p className="mb-6 text-3xl font-medium text-richblack-900 dark:text-yellow-100">
        ₹ {total}
      </p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}
