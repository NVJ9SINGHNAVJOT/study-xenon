import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {sendOtpForAdminSignUp} from "../services/operations/adminAPI"
import OtpInput from "react-otp-input";
import { forAdminSignUp } from '../services/operations/adminAPI'

const AdminSignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [sentOtp, setSendOtp] = useState(false);


    const [otp, setOtp] = useState("");
    const accountType = "Admin";
  
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
    const { firstName, lastName, email, password, confirmPassword } = formData;
  


    // Handle input fields, when some value changes
    const handleOnChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }
  
    // Handle Form Submission
    const handleOnSubmit = async (e) => {
      e.preventDefault()
  
      if (password !== confirmPassword) {
        toast.error("Passwords Do Not Match")
        return
      }

      // Send OTP to user for verification
      const response = await sendOtpForAdminSignUp(formData.email);
      if(!response){
        return;
      }
      else{
        setSendOtp(true)
      } 
    }


    const handleVerifyAndSignup = async (event) => {
        event.preventDefault();
        // console.log("before final data otp", otp)
        const signupData = {
            ...formData,
            accountType,
            otp,
          }
        // console.log("final data", signupData);

          const response = await forAdminSignUp(signupData);
        // console.log("admin signup res", response)  
        if(!response){
            navigate("/admin/signup")
        }  
        else{
            navigate("/admin/login")
        }
    }

  return (
    <div className='w-full flex justify-center'>

        {sentOtp ? (
                        <div className=" mt-40 flex flex-col gap-y-4 w-6/12">
                            <form onSubmit={ handleVerifyAndSignup}>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => (
                                        <input
                                        {...props}
                                        placeholder="-"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                        />
                                    )}
                                    containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "0 6px",
                                    }}
                                />
                                <button
                                type="submit"
                                className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                                >
                                Verify Email
                                </button>
                            </form>
                        </div>
                    ) 
                    : 
                    (
                        <form onSubmit={handleOnSubmit} className=" mt-16 flex flex-col gap-y-4 w-6/12">
                            <div className="flex gap-x-4">
                            <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                First Name <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={handleOnChange}
                                placeholder="Enter first name"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label>
                            <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Last Name <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleOnChange}
                                placeholder="Enter last name"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label>
                            </div>
                            <label className="w-full">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Email Address <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                placeholder="Enter email address"
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-5/12 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />
                            </label>
                            <div className="flex gap-x-4">
                            <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Create Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter Password"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                />
                                <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                                </span>
                            </label>
                            <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Confirm Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm Password"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                />
                                <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                                </span>
                            </label>
                            </div>
                            <button
                            type="submit"
                            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                            >
                            Create Account
                            </button>
                        </form>
                    )  
        
        }

    </div>
  )
}

export default AdminSignUp