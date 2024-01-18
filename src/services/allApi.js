import { base_url } from "./baseurl"
import { commonAPI } from "./commonAPI"

//register
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${base_url}/user/register`,user,"")
}
//login

export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${base_url}/user/login`,user,"")
}

//addproject

export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${base_url}/project/add`,reqBody,reqHeader)
}

//homeproject

export const homeProjectAPI = async ()=>{
    return await commonAPI("GET",`${base_url}/projects/home-projects`,"","")
}

//allprojects

export const allProjectsAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${base_url}/projects/all?search=${searchKey}`,"",reqHeader)

}

//userproject

export const userProjectAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${base_url}/user/all-projects`,"",reqHeader)
}

//editproject

export const editProjectAPI = async (projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${base_url}/projects/edit/${projectId}`,reqBody,reqHeader)
}

export const deleteProjectApi = async (projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${base_url}/projects/delete/${projectId}`,{},reqHeader)
}
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${base_url}/user/edit`,reqBody,reqHeader)
}