import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectApi, userProjectAPI } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../Contexts/ContextShare';
import {Alert} from 'react-bootstrap'
import EditProject from './EditProject';
import { editProjectResponseContext } from '../Contexts/EditContextshare';
function MyProjects() {
  const [userProjects,setUserProjects] = useState([])
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const getUserprojects = async ()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await userProjectAPI(reqHeader)
      if(result.status===200){
        setUserProjects(result.data)
      }else{
        console.log(result);
        toast.warning(result.response.data)
      }

    }
  }
  const handleDelete = async (id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await deleteProjectApi(id,reqHeader)
    if(result.status===200){
      getUserprojects()
    }else{
      toast.error(result.response.data)
    }
  }

  useEffect(()=>{
     getUserprojects()
  },[addProjectResponse,editProjectResponse])
  return (
    <div className='card shadow p-3 mb-3'>
        <div className='d-flex'>
          <h3>My Projects</h3>
          <div className='ms-auto'><AddProject/></div>
          {
            addProjectResponse.title&&
            <Alert><span>{addProjectResponse.title}</span>Added Successfuly!!!</Alert>
          }
        </div>
        <div className='mt-4'>
            {
              userProjects?.length>0?userProjects.map(project=>(
                <div className='border d-flex align-items-center rounded p-2 mt-2'>
                <h5>{project.title}</h5>
                <div className='icon d-flex ms-auto'>
                    <EditProject project={project}/>
                    <button className='btn'><a href={`${project.github}`} target='_blank'><i class="fa-brands fa-github fa-2x"></i></a></button>
                    <button onClick={()=>handleDelete(project._id)} className='btn'><i class="fa-solid fa-trash fa-2x"></i></button>

                </div>

            </div>
              )):
              <div>
              <p className='text-danger fw-bolder fs-4'>No Projects are Available</p>
            </div>
            }

        </div>
        <ToastContainer autoClose={2000} theme='colored'/>

    </div>
  )
}

export default MyProjects