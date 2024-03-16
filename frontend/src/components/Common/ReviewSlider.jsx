import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import {getReviewsData} from "../../services/operations/pageAndComponentData";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation} from 'swiper/modules';


// Icons
import { FaStar } from "react-icons/fa"




function ReviewSlider() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    ;(async () => {
      const data = await getReviewsData();
      // console.log(data);
      if (data?.success) {
        setReviews(data?.data);
      }
    })()
  }, [])

  // console.log(reviews)

  return (
    // swipper conatiner
    <div className="w-full h-[270px] rounded-xl flex justify-center items-center">

        <Swiper
          spaceBetween={25}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper rounded-xl h-full w-full"
        >
        {
          reviews?.length &&
          reviews.map((review, index) =>{
            return <SwiperSlide key={index} className=" text-center text-lg   bg-white bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
              <div className=" w-10/12 flex flex-col justify-between items-center">
                <div className=" font-semibold text-2xl text-blue-100 mb-2" >{review?.course?.courseName}</div>
                <div className="flex justify-center items-center gap-2">
                  <img src= {review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                          alt=""
                          className="h-[40px] w-[40px] rounded-full object-cover"
                          >
                  </img>
                  <div className=" text-2xl ">
                  {`${review?.user?.firstName} ${review?.user?.lastName}`}
                  </div>
                </div>
                
                <div className=" text-pure-greys-200 ">
                  " {review?.review} " 
                </div>
                {/* rating stars */}
                <div className="relative flex justify-center items-center gap-3 mt-3">
                  <div className=" text-yellow-50 text-3xl mt-1 ">{review?.rating}</div>
                  <ReactStars
                      count={5}
                      value={review?.rating}
                      size={30}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                  />
                </div>
                
              </div>
            </SwiperSlide>
          })
        }
        </Swiper>
      </div>
  )
}

export default ReviewSlider