import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { createCategory } from '../../services/operations/adminAPI'
import { useSelector } from 'react-redux'
import { setLoading } from '../../slices/authSlice'

const CreateCategory = () => {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating Category")
    // console.log("Form Data - ", data)
    try {
      const response = await createCategory(data, token);
      if(response){
        toast.dismiss(toastId);
        toast.success(`${data.name} created successfully`)
        return;
      }
      else{
        toast.dismiss(toastId);
        toast.error("Error while creating Category")
      }  
    } catch (error) {
      // console.log("ERROR MESSAGE - ", error.message)
    }
    toast.dismiss(toastId);
  }


  return (
    <div className='w-full flex justify-center'>
      <form className='text-white flex flex-col items-center mt-20 gap-5 w-fit'  onSubmit={handleSubmit(onSubmit)}>

        <div className='flex flex-col'>   
          <label htmlFor='category' className='lable-style text-xl mb-4'
           >
          Category Name
          </label>
          <input type="text"
            name="category"
            id="category"
            placeholder='Create Category'
            className="form-style w-[380px]" 
            {...register("name", { required: true })}
            />
            
            {errors.name && (
                    <span className="mt-1 text-[12px] text-yellow-100">
                        Please enter your Email id.
                    </span>
            )}
        </div>
        
        
        <div className='flex flex-col'>   
          <label htmlFor='description' className='lable-style text-xl mb-4'
           >
           Description
          </label>
          <input type="text"
            name="description"
            id="description"
            placeholder='Description'
            className="form-style w-[380px]" 
            {...register("description", { required: true })}
            />
            
            {errors.description && (
                    <span className="mt-1 text-[12px] text-yellow-100">
                        Please enter your Email id.
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
                Create Category
            </button>
        

      </form>
    </div>
  )
}

export default CreateCategory