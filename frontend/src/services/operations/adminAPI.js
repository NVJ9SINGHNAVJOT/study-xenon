import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { adminEndpoints } from "../apis"
import {setToken} from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"

const {
    ADMIN_SEND_OTP,
    ADMIN_SIGNUP,
    ADMIN_LOGIN_API,
    MAIN_PAGE_DATA_API,
    CREATE_CATEGORY_API ,
    ALL_STUDENTS_DATA_API ,
    ALL_INSTRUCTORS_DATA_API ,
    ALL_COURSES_DATA_API,
} = adminEndpoints


// ALL_INSTRUCTOR_EARNINGS_API is not active

export const sendOtpForAdminSignUp = async(email) => {
    try {
        const response = await apiConnector("POST", ADMIN_SEND_OTP, {email});
        // console.log("res for adminotp", response);
        if(!response.data.success){
            toast.error("Could not send OTP for admin");
            return false;
        }

        return response.data.success;

    } catch (error) {
        // console.log("error", error);
        return false;
    }
}


export const forAdminSignUp = async(signupData) => {
    try {
        // console.log("data", signupData)
        const response = await apiConnector("POST", ADMIN_SIGNUP, {signupData});
        // console.log("res for admin signUp", response);
        if(!response.data.success){
            toast.error("Could not signUp for Admin");
            return false;
        }

        return response.data.success;

    } catch (error) {
        // console.log("error", error);
        return false;
    }
}



export const adminLogin = async(data, navigate, dispatch) => {
    try {
        // console.log("1", data)
        const response = await apiConnector("POST", ADMIN_LOGIN_API, {data})
        
        // console.log("2", response)
        if(!response?.data?.success){
            // console.log("error in adminlogin", response?.data);
            return;
        }
        // console.log(response?.data?.adminDetails)
        // console.log(response?.data?.token)
        dispatch(setUser(response?.data?.adminDetails))
        dispatch(setToken(response?.data?.token))

        localStorage.setItem("token", JSON.stringify(response?.data?.token))
        localStorage.setItem("user", JSON.stringify(response?.data?.adminDetails))
        // console.log("good")
        navigate("/admin/mainpage");
        return response?.data?.success;
    } catch (error) {
        // console.log("error in admin login api", error);
    }
    return;
}

export const getDataValues = async(token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", MAIN_PAGE_DATA_API, null, {
            Authorization: `Bearer ${token}`,
          })
        
          // console.log(response)

        if(!response.data.success){
            // console.log("data is not found for mainpagedata api")
            return null;
        }
        toast.dismiss(toastId)
        return response.data.data;
    } catch (error) {
        // console.log(error);
        toast.dismiss(toastId)
        return null
    }
}

export const createCategory = async(data, token) => {
    const name = data.name
    const description = data.description
    try {
        const response = await apiConnector("POST", CREATE_CATEGORY_API, {name, description}, {Authorization: `Bearer ${token}`});
        // console.log(response)
        if(response.data.success){
            return true;
        }
        else{
            return false;
        }

    } catch (error) {
        // console.log("erron in creating category", error)
        return false;
    }
}

export const getStudentsData = async(token) => {
    try {
        const response = await apiConnector("GET", ALL_STUDENTS_DATA_API, null, {Authorization: `Bearer ${token}`});
        // console.log(response)
        if(response.data.success){
            return response.data;
        }
        else{
            // console.log("error in ALL_STUDENTS_DATA_API", response)
            return null;
        }
    } catch (error) {
        // console.log("error in ALL_STUDENTS_DATA_API - ", error)
        return null;
    }
}

export const getCoursesData = async(token) => {
    try {
        const response = await apiConnector("GET", ALL_COURSES_DATA_API, null, {Authorization: `Bearer ${token}`});
        // console.log(response)
        if(response.data.success){
            return response.data;
        }
        else{
            // console.log("error in ALL_COURSES_DATA_API", response)
            return null;
        }
    } catch (error) {
        // console.log("error in ALL_COURSES_DATA_API - ", error)
        return null;
    }
}


export const getInstructorData = async(token) => {
    try {
        const response = await apiConnector("GET", ALL_INSTRUCTORS_DATA_API, null, {Authorization: `Bearer ${token}`});
        // console.log(response)
        if(response.data.success){
            return response.data;
        }
        else{
            // console.log("error in ALL_INSTRUCTORS_DATA_API", response)
            return null;
        }
    } catch (error) {
        // console.log("error in ALL_INSTRUCTORS_DATA_API - ", error)
        return null;
    }
}


