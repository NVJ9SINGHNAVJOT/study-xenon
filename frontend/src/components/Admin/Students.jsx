import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getStudentsData } from '../../services/operations/adminAPI'
import toast from 'react-hot-toast'


const Students = () => {

  const {token} = useSelector((state) => state.auth);
  const [students, setStudents] = useState(null);

  useEffect(() => {
      ;(async () => {
        const toastId = toast.loading("Loading")
        try {
          const response = await getStudentsData(token)
          if(response.success){
            toast.dismiss(toastId)
            setStudents(response.data);
          }
          else{
            toast.dismiss(toastId)
            toast.error("Error")
          }
        } catch (error) {
          toast.dismiss(toastId)
          // console.log("error whiel getting students data",error)
        }
      })()

  }, [])
  
  return (
    <div className='w-full'>
        <h2 className='mt-10 ml-14 text-xl' > Students Data </h2>
        <div className=" rounded-t-md border-b border-b-richblack-800 px-6 py-2 mt-14">

          {students && students?.length && students.map((user) => {
              return <div
                      key={user._id}
                      className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 items-center justify-evenly"
                    >
                      <div className="text-sm font-medium text-richblack-100">
                      <img className=' rounded-xl' src = {user.image ? user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`} alt='' width={"40px"} height={"40px"}/>
                      </div>
                      <div className="text-sm font-medium text-richblack-100">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm font-medium text-richblack-100">
                        {user.email} 
                      </div>
                      <div className="text-sm font-medium text-richblack-100">
                        Courses : {user.enrolledCoursesCount}
                      </div>
                      <div className="text-sm font-medium text-richblack-100">
                        Reviews : {user.ratingAndReviewsCount}
                      </div>
                    </div>
            })}
        </div>
        
    </div>
  )
}

export default Students