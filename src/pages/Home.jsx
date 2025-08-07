import React, { useContext } from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'
import HighlightTextOne from '../components/core/HomePage/HighlightTextOne'
import Footer from '../components/common/Footer'
import CTAButton from "../components/core/HomePage/Button"

import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import InteractiveVideo from "../components/InteractiveVideo";
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import { ThemeContext } from '../contexts/ThemeContext'

const Home = () => {
  const { theme } = useContext(ThemeContext)
  const isLight = theme === "light"

  return (
    <div className={`${isLight ? "bg-white text-gray-900" : ""}`}>
      {/*Section1*/}
      <div className={`relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
        justify-between ${isLight ? "text-gray-800" : "text-teal-100"}`}>

        <Link to={"/signup"}>
          <div className={`group mt-16 p-1 mx-auto rounded-full font-bold
            transition-all duration-200 hover:scale-95 w-fit 
            ${isLight
              ? "bg-gray-200 text-gray-800 shadow-md"
              : "bg-zinc-900 text-richblack-200 shadow-[0_4px_20px_rgba(0,0,0,0.4),_0_0_6px_rgba(255,215,0,0.1)]"}`}>
            <div className={`flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
              transition-all duration-200 ${isLight ? "group-hover:bg-gray-300" : "group-hover:bg-richblack-900"}`}>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-7'>
          Level Up Your Life with
          <HighlightText text={" Tech Skills"} />
        </div>

        <div className={`mt-4 w-[90%] text-center text-lg font-bold ${isLight ? "text-gray-600" : "text-gray-200"}`}>
          Learn to code on your terms — anytime, anywhere. Our online courses give you access to hands-on projects, interactive quizzes, and expert guidance, all designed to help you grow with personalized feedback at your own pace.
        </div>

        <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}> Learn More </CTAButton>
          <CTAButton active={false} linkto={"/login"}> Book a Demo </CTAButton>
        </div>

        <InteractiveVideo />

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock your mind,
                <HighlightText text={" start to explore"} /> - our coding courses open the door!
              </div>
            }
            subheading={
      <p className={`  text-lg font-bold ${isLight ? "text-gray-600" : "text-gray-200"} `}>
        Our courses are designed and taught by industry experts who have years of experience in
        coding and are passionate about sharing their knowledge with you.
      </p>
    }
            ctabtn1={{ btnText: "try it yourself", linkto: "/signup", active: true }}
            ctabtn2={{ btnText: "learn more", linkto: "/login", active: false }}
            codeblock={`#include<iostream>\n#include<bits/stdc++.h>\nint main(){\nfor(int i=0;i<10;i++){\ncout<<"Hello World";\n}\n}\nreturn 0\n`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                Sync your
                <HighlightText text={" ambition with code"} /> - built to scale, built online
              </div>
            }
             subheading={
      <p className={`  text-lg font-bold ${isLight ? "text-gray-600" : "text-gray-200"} `}>
        Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
      </p>
    }
          
            ctabtn1={{ btnText: "try it yourself", linkto: "/signup", active: true }}
            ctabtn2={{ btnText: "learn more", linkto: "/login", active: false }}
            codeblock={`import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\nimport "./index.css";\nimport { BrowserRouter } from "react-router-dom";\nReactDOM.createRoot(dont.getEtById("root"));\n`}
            codeColor={"text-yellow-25"}
          />
        </div>

        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className={`${isLight ? "bg-gray-100 text-gray-800" : "bg-pure-greys-5 text-richblack-700"}`}>
        <div className='homepage_bg h-[310px]'>
          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className='h-[150px]'></div>
            <div className='flex flex-row gap-7 text-white '>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div> Learn more </div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
          <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
            <div className='text-4xl font-semibold w-[45%]'>
              Gain the skills required for
              <HighlightTextOne text={"today’s most in-demand careers"} />
            </div>

            <div className='flex flex-col gap-10 w-[40%] items-start'>
              <div className={`text-lg font-bold  ${isLight ? "text-gray-700" : "text-slate-600"}`}>
                The modern SkillNova dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div> Learn more </div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className={`w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 ${isLight ? "text-gray-800" : "text-white"}`}>
        <InstructorSection />
       <h2 className="text-center text-4xl font-semibold mt-10 text-teal-700 dark:text-teal-200">
  Reviews from Other Learners
</h2>

        {/* Review Slider */}
      </div>

      <Footer />
    </div>
  )
}

export default Home;
