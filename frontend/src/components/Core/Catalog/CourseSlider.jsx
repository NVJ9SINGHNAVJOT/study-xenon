import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination,Navigation, Autoplay } from 'swiper/modules';


import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {
  return (
    <div className='flex justify-center items-center w-full h-[400px]'>
      {Courses?.length ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          className="mySwiper w-full h-full"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i} className= "flex justify-center items-center">
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
      </div>
  )
}

export default CourseSlider
