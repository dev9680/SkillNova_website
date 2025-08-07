import React from 'react'
import Instructor from "../../../assets/Images/3d-girl2.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-24 px-6 sm:px-12 md:px-20 lg:px-28'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-10'>

        {/* Image */}
        <div className='flex justify-center md:justify-start w-full md:w-1/2'>
          <img
            src={Instructor}
            alt="Instructor"
            className='w-[70%] max-w-[360px] md:max-w-[400px] object-contain drop-shadow-md'
          />
        </div>

        {/* Text Content */}
        <div className='w-full md:w-1/2 text-center md:text-left flex flex-col gap-6'>

          {/* Heading */}
          <h2 className='text-3xl sm:text-4xl font-semibold leading-snug text-gray-900 dark:text-teal-200'>
            Become an
            <HighlightText text=" Instructor" />
          </h2>

          {/* Description */}
          <p className=' font-bold  ${isLight ? "text-gray-700" : "text-slate-600"} leading-relaxed max-w-md mx-auto md:mx-0'>
            Instructors from around the world teach millions of students on SkillNova.We provide the tools and support to help you teach what you love with confidence.
          </p>

          {/* Button */}
          <div className='flex justify-center md:justify-start'>
            <CTAButton active={true} linkto="/signup">
              <div className='flex flex-row gap-2 items-center'>
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>

        </div>
      </div>
    </div>
  )
}

export default InstructorSection
