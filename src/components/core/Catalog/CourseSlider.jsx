import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {
  return (
    <div className="w-full">
      {Courses?.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="!py-8"
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height="h-[250px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-center text-richblack-5 dark:text-richblack-100 py-10">
          No Courses Found
        </p>
      )}
    </div>
  )
}

export default CourseSlider
