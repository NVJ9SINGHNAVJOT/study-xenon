import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/operations/authAPI'
import { useDispatch } from 'react-redux'

const LogOutModal = ({setLogOutModal}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 flex justify-center items-center gap-10 overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        
        <button className='text-white text-2xl' onClick={()=>  dispatch(logout(navigate)) }>
            Log Out
        </button>
        
        <button className='text-white text-2xl ' onClick={()=> { setLogOutModal(false) }} >
            Cancel
        </button>
    </div>
  )
}

export default LogOutModal