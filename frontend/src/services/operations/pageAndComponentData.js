import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';
import {categories} from "../apis"
import { ratingsEndpoints } from "../apis";


export const getCategoriesData = async()=>{
  let response;
  try {
    response = await apiConnector("GET", categories.CATEGORIES_API);
    if(!response.data.success){
      // console.log("error in categories api data")
      return response?.data;
    }
  } catch (error) {
    // console.log("error in getCategoriesData", error);
  }
  return response?.data;
}


export const getCatalogaPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;

  }
  catch(error) {
    // console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

export const getReviewsData = async ()=> {
  const toastId = toast.loading("Loading...");
  let result;
  try {
    const response = await apiConnector(
      "GET",
      ratingsEndpoints.REVIEWS_DETAILS_API
    )
    // console.log("1", response)
    if(!response?.data?.success)
            throw new Error("Could not Fetch rating and reviews data");

    // console.log("2", response.data)
    result = response?.data;

    // console.log("3", result)
  } catch (error) {
    // console.log("RATING AND REVIEWS DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

