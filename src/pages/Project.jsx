import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectsAPI } from '../services/allApi'

function Project() {
  const [searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])
  const getAllProjects = async ()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectsAPI(searchKey,reqHeader)
      if(result.status===200){
        setAllProjects(result.data)
      }else{
        console.log(result);
      }
    }
  }

  useEffect(()=>{
     getAllProjects()
  },[searchKey])
  return (
    <>
      <Header/>
      <div>
        <h1 className='text-center fs-2 mt-3'>All Projects</h1>
        <div className='d-flex justify-content-center align-items-center w-100 mt-3 mb-5'>
          <div className='d-flex border w-50 rounded'>
             <input type='text' className='form-control' placeholder='Search projects By  Technologies' value={searchKey} onChange={e=>setSearchKey(e.target.value)}/>
             <i style={{marginLeft:'-50px'}} className="fa-solid fa-magnifying-glass fa-rotate-90"></i>
          </div>
        </div>
        <Row className='container-fluid'>
          {
            allProjects?.length>0?allProjects.map(project=>(
              <Col sm={12} md={6} lg={4}>
                <ProjectCard project={project}/>
              </Col>
        
            )): <p className='text-center fs-1 text-danger'>Please Login!!!</p>
          }
          </Row>
      </div>
    </>
  )
}

export default Project