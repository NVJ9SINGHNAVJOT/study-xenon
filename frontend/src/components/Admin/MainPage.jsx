import React from 'react'
import { useState, useEffect } from 'react';
import Logo from "../../assets/Logo/web_logo.png"
import { getDataValues } from '../../services/operations/adminAPI';
import { useSelector } from 'react-redux';

const MainPage = () => {

  const { token } = useSelector((state) => state.auth)
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    const data = async() =>{
      const response = await getDataValues(token);
        if(response){
          setMainData(response)
        }
      } 
      data();
      
  }, [])



  return (
    <div className='text-white w-full mt-10'>

      {/* grid */}
      <div className='grid grid-cols-2 grid-rows-2 gap-2'>

        <div className='text-white flex flex-col justify-evenly items-center gap-4 '>
          <h1 className='font-bold text-2xl'>StudyXenon</h1>
          <span className=' text-blue-300 text-xl'>Ed-Tech Website</span>
          <p>Creating learning more Creative</p>
        </div>

        <img src={Logo} alt='' height={"400px"} width={"400px"} className=' object-contain'
        />

        <div className=' mt-5 '>
          <div className=' text-lg font-mono '>Total Instructors</div>
          <span className=' text-blue-50'> {mainData && mainData.instructors} </span>
          <div className=' text-lg font-mono '>Total Students</div>
          <span className=' text-blue-50'>{mainData && mainData.students} </span>
        </div>

        <div className=' mt-5 '>
          <div className=' text-lg font-mono '>Total Courses</div>
          <span className=' text-blue-50'>{mainData && mainData.courses} </span>
          <div className=' text-lg font-mono '>Total Rating and Reviews</div>
          <span className=' text-blue-50'>{mainData && mainData.ratingAndReviews} </span>
        </div>
      
      </div>
    </div>
  )
}

export default MainPage