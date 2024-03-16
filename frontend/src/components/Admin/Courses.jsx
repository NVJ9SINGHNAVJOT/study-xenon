import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { getCoursesData } from '../../services/operations/adminAPI';


const Courses = () => {
  const {token} = useSelector((state) => state.auth)
  const[courses,setCourses] = useState(null);

  useEffect(() => {
    ;(async() => {

      const toastId = toast.loading("Loading..")
      try {
        const response = await getCoursesData(token);
        if(response.success){
          toast.dismiss(toastId);
          setCourses(response.data);
        }
        else{
          toast.dismiss(toastId);
          toast.error("Error - Cannot find courses data")
        }  
      } catch (error) {
        toast.dismiss(toastId);
        // console.log("error in getCoursesData ", error)
      }
      
    })()
  
    return () => {
    }
  }, [])
  

  return (
    <div className='w-full flex justify-center'>

      <div className='grid grid-cols-1 grid-flow-row w-11/12 gap-4 mt-8 '>

          {/* heading ror */}
          <div className='w-full flex justify-evenly rounded-t-md border-b border-b-richblack-800'>
            <div className=' w-2/12 text-center '>Thumbnail</div>
            <div className=' w-2/12 text-center '>Course Name</div>
            <div className=' w-2/12 text-center '>Instructor</div>
            <div className=' w-3/12 text-center '>Students Enrolled</div>
            <div className=' w-2/12 text-center '>Reviews</div>
          </div>
          

          {/* courses data */}
          {courses && courses?.length && courses.map((course, index) =>{
            
            return <div key={index} className='w-full flex justify-evenly rounded-t-md border border-richblack-800'>
                      <div className=' w-2/12 flex justify-center'>
                        <img alt='' src={course.thumbnail} height={"90%"} width={"80%"}/>
                      </div>
                      <div className=' w-2/12 text-center pt-5  text-richblack-100'>{course.courseName}</div>
                      <div className=' w-2/12 text-center pt-5  text-richblack-100'>{course.instructor.firstName} {course.instructor.lastName}</div>
                      <div className=' w-3/12 text-center pt-5  text-richblack-100'>{course.studentsEnrolled}</div>
                      <div className=' w-2/12 text-center pt-5  text-richblack-100'>{course.ratingAndReviews}</div>
                   </div>

          })}

      </div>

    </div>
  )
}

export default Courses