import React from 'react'
import { useEffect, useState } from "react"
import {NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import LogOutModal from "../components/Admin/LogOutModal"
import * as Icons from "react-icons/vsc"





const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const [logOutModal, setLogOutModal] = useState(false)

  const matchAdminRoute = (currLocation) => {
    let url = location.pathname;
    const urlArr = url.split("/");
    return urlArr.includes(currLocation);
  }


  return (
    <div className='w-full flex min-h-[calc(100vh-3.5rem)]'>

      {/* dashboard bar */}
      <div className="w-[290px] flex flex-col items-center ">

        <div className='mt-20 flex justify-center items-center flex-col gap-2 w-10/12'>

          
          <div onClick={() => navigate("/admin/mainpage")} className={`w-full rounded-lg relative cursor-pointer px-8 py-2 text-sm font-medium 
            ${
              matchAdminRoute("mainpage")
                ? "bg-yellow-800 text-yellow-50"
                : "bg-opacity-0 text-richblack-300"
              } transition-all duration-200`}
          >
            StudyXenon
          </div>
          <div onClick={() => navigate("/admin/createCategory")} className={`w-full rounded-lg relative cursor-pointer px-8 py-2 text-sm font-medium 
            ${
              matchAdminRoute("createCategory")
                ? ("bg-yellow-800 text-yellow-50")
                : ("bg-opacity-0 text-richblack-300")
              } transition-all duration-200`}>
              Create Category
          </div>
          <div onClick={() => navigate("/admin/students")} className={`w-full rounded-lg relative cursor-pointer px-8 py-2 text-sm font-medium 
            ${
              matchAdminRoute("students")
                ? "bg-yellow-800 text-yellow-50"
                : "bg-opacity-0 text-richblack-300"
              } transition-all duration-200`}>
              Students
          </div>
          <div onClick={() => navigate("/admin/courses")} className={`w-full rounded-lg relative cursor-pointer px-8 py-2 text-sm font-medium 
            ${
              matchAdminRoute("courses")
                ? "bg-yellow-800 text-yellow-50"
                : "bg-opacity-0 text-richblack-300"
              } transition-all duration-200`}>
              Courses
          </div>
          <div onClick={() => navigate("/admin/instructors")} className={`w-full rounded-lg relative cursor-pointer px-8 py-2 text-sm font-medium 
            ${
              matchAdminRoute("instructors")
                ? "bg-yellow-800 text-yellow-50"
                : "bg-opacity-0 text-richblack-300"
              } transition-all duration-200`}>
              Instructors
          </div>
          <div onClick={() => {setLogOutModal(true)}} 
            className={`w-full bg-opacity-0 text-richblack-300 rounded-lg relative cursor-pointer px-8 py-2 text-sm font-medium` }
          >
              Log Out
          </div>

        </div>

      </div>


      {/* dashboard pages */}
      <div className=" w-[calc(100vw-19rem)] text-white">
            <Outlet />
      </div>

      {logOutModal && <LogOutModal setLogOutModal= {setLogOutModal} />}
    </div>
  )
}

export default AdminDashboard