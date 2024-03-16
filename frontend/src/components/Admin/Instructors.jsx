import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../services/operations/adminAPI';


const Instructors = () => {
  const {token} = useSelector((state) => state.auth)
  const[instructor, setInstructor] = useState(null);

  useEffect(() => {
    ;(async() => {

      const toastId = toast.loading("Loading..")
      try {
        const response = await getInstructorData(token);
        if(response.success){
          toast.dismiss(toastId);
          setInstructor(response.data);
        }
        else{
          toast.dismiss(toastId);
          toast.error("Error - Cannot find allInstructors data")
        }  
      } catch (error) {
        toast.dismiss(toastId);
        // console.log("error in allInstructors ", error)
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
            <div className=' w-2/12 text-center '>Image</div>
            <div className=' w-2/12 text-center '>Name</div>
            <div className=' w-3/12 text-center '>Email</div>
            <div className=' w-2/12 text-center '>Total Courses</div>
          </div>
          

          {/* courses data */}
          {instructor && instructor?.length && instructor.map((user, index) =>{
            
            return <div key={index} className='w-full flex justify-evenly items-center rounded-t-md border border-richblack-800'>
                      <div className=' w-2/12 flex justify-center '>
                        <img alt='' className=' rounded-xl ' src={user?.image ? user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`} width={"40px"} height={"40px"}/>
                      </div>
                      <div className=' w-2/12 text-center text-richblack-100'>{user?.firstName} {user?.lastName}</div>
                      <div className=' w-3/12 text-center text-richblack-100'>{user?.email}</div>
                      <div className=' w-2/12 text-center text-richblack-100'>{user?.courses}</div>
                   </div>

          })}

      </div>

    </div>
  )
}

export default Instructors
