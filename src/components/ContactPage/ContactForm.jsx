import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="rounded-xl border border-gray-300 bg-white text-gray-800 dark:border-richblack-600 dark:bg-richblack-900 dark:text-richblack-300 p-7 lg:p-14 flex flex-col gap-3">
      <h1 className="text-4xl leading-10 font-semibold text-gray-900 dark:text-richblack-5">
        Got an idea? We&apos;ve got the skills. Let&apos;s team up.
      </h1>
      <p className="text-gray-700 dark:text-richblack-200">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
