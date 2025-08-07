import React from "react";

import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Footer from "../components/common/Footer";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";

const About = () => {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-800">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <HighlightText text={" Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-gray-700 dark:text-gray-300 lg:w-[95%]">
              SkillNova is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-b border-gray-300 dark:border-gray-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      {/* Our Story, Vision, Mission */}
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-gray-700 dark:text-gray-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education...
              </p>
              <p className="text-base font-medium text-gray-700 dark:text-gray-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges...
              </p>
            </div>

            <div>
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>

          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                Our Vision
              </h1>
              <p className="text-base font-medium text-gray-700 dark:text-gray-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform...
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]">
                Our Mission
              </h1>
              <p className="text-base font-medium text-gray-700 dark:text-gray-300 lg:w-[95%]">
                Our mission goes beyond just delivering courses online...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsComponenet />

      {/* Learning Grid and Contact */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Reviews */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
        <h2 className="text-center text-4xl font-semibold text-gray-800 dark:text-teal-200">
          Reviews from Other Learners
        </h2>
        {/* <ReviewSlider /> */}
      </div>

      <Footer />
    </div>
  );
};

export default About;
