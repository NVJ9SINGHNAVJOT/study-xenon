import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import {adminLogin} from "../services/operations/adminAPI";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"


const AdminHomepage = () => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
      } = useForm()
    
      const onSubmit = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Loading...")
        // console.log("Form Data - ", data)
        try {
          const response = await adminLogin(data, navigate, dispatch);
          if(response){
            toast.dismiss(toastId);
            return;
          }  
          // console.log("Email Res - ", response)
        } catch (error) {
          // console.log("ERROR MESSAGE - ", error.message)
        }
        toast.dismiss(toastId);
        setLoading(false);
      }




  return (
    <div className='text-white w-full flex  flex-col justify-center mt-5 items-center '>
        <p className=' text-4xl '>Admin Homepage</p>
        <p className='m-4 text-xl'>Login</p>
        <form className='flex flex-col justify-between items-center w-[300px]'
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className='flex flex-col m-4 w-full'>
                <label htmlFor='email' className='lable-style text-xl'>
                    Email
                </label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    placeholder="Email address"
                    className="form-style"
                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <span className="mt-1 text-[12px] text-yellow-100">
                        Please enter your Email id.
                    </span>
                )}
            </div>
            


            <div className='flex flex-col mt-4 mb-3 w-full'>
                <label htmlFor='password' className='lable-style  text-xl'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder="Password"
                    className="form-style w-25"
                    {...register("password", { required: true })}
                />
                {errors.email && (
                    <span className="mt-1 text-[12px] text-yellow-100">
                        Password is required.
                    </span>
                )}
            </div>


            <div className='flex flex-col mb-3 w-full'>
                <label htmlFor='conformPassword' className='lable-style  text-xl'>
                    Confirm Password
                </label>
                <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder="Confirm Password"
                    className="form-style"
                    {...register("confirmPassword", { required: true })}
                />
                {errors.email && (
                    <span className="mt-1 text-[12px] text-yellow-100">
                        Password is required.
                    </span>
                )}
            </div>
            


            <button
                disabled={loading}
                type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${
                !loading &&
                "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Sign In
            </button>

            

        </form>
    </div>
  )
}

export default AdminHomepage