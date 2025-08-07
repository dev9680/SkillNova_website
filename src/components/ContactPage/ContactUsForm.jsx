import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-7 text-gray-900 dark:text-richblack-200"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* First and Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="text-sm font-medium text-gray-800 dark:text-richblack-25">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="w-full rounded-lg border border-gray-300 p-3 text-sm
                       bg-white text-gray-900 placeholder-gray-500
                       dark:bg-richblack-800 dark:border-richblack-600 dark:text-white dark:placeholder-richblack-400"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-xs text-yellow-400">
              Please enter your name.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="text-sm font-medium text-gray-800 dark:text-richblack-25">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="w-full rounded-lg border border-gray-300 p-3 text-sm
                       bg-white text-gray-900 placeholder-gray-500
                       dark:bg-richblack-800 dark:border-richblack-600 dark:text-white dark:placeholder-richblack-400"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-800 dark:text-richblack-25">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="w-full rounded-lg border border-gray-300 p-3 text-sm
                     bg-white text-gray-900 placeholder-gray-500
                     dark:bg-richblack-800 dark:border-richblack-600 dark:text-white dark:placeholder-richblack-400"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-xs text-yellow-400">
            Please enter your Email address.
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-sm font-medium text-gray-800 dark:text-richblack-25">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              id="countrycode"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm
                         bg-white text-gray-900 dark:bg-richblack-800 dark:text-white dark:border-richblack-600"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              id="phonenumber"
              placeholder="12345 67890"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm
                         bg-white text-gray-900 placeholder-gray-500
                         dark:bg-richblack-800 dark:border-richblack-600 dark:text-white dark:placeholder-richblack-400"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-xs text-yellow-400">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-800 dark:text-richblack-25">
          Message
        </label>
        <textarea
          id="message"
          rows="7"
          placeholder="Enter your message here"
          className="w-full rounded-lg border border-gray-300 p-3 text-sm
                     bg-white text-gray-900 placeholder-gray-500
                     dark:bg-richblack-800 dark:border-richblack-600 dark:text-white dark:placeholder-richblack-400"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-xs text-yellow-400">
            Please enter your Message.
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-sm font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-base`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
