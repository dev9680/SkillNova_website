import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto bg-zinc-900 dark:bg-slate-900 px-4 py-10 rounded-xl shadow-md transition-colors duration-300">
      <h1 className="text-center text-4xl font-semibold text-richblack-5 dark:text-white">
        Get in Touch
      </h1>
      <p className="text-center text-richblack-300 dark:text-slate-400 mt-3">
        We&apos;d love to hear from you. Please fill out this form.
      </p>
      <div className="mt-12 mx-auto">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
