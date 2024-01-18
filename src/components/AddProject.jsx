import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allApi';
import { addProjectResponseContext } from '../Contexts/ContextShare';

function AddProject() {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);
  const [projectDetails,setProjectdetails] = useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })
  //console.log(projectDetails);
  const [preview,setpreview] = useState("")
  const [token,setToken] = useState("")
  const handleClose = () => {
    setShow(false)
    setProjectdetails({
      title:"",languages:"",overview:"",github:"",website:"",projectImage:""
    })
    setpreview("")
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }else{
      setToken("")
    }
  },[])
  const handleShow = () => setShow(true);
  useEffect(()=>{
    if(projectDetails.projectImage){
    setpreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])
  
  const handleAdd = async (e)=>{
    const{title,languages,overview,github,website,projectImage} = projectDetails
    if(!title ||!languages ||!overview ||!github ||!website ||!projectImage){
        toast.info("Please fill the form Completely!!!")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
           "Authorization":`Bearer ${token}`
        }
      const result = await addProjectAPI(reqBody,reqHeader)
      if(result.status===200){
        console.log(result.data);
        handleClose()
        setAddProjectResponse(result.data)
      }else{
        console.log(result);
        console.log(result.response.data);
      }
       }
      
    }
  }
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className='col-lg-6'>
              <label>
              <input type="file" style={{display:'none'}} onChange={e=>setProjectdetails({...projectDetails,projectImage:e.target.files[0]})}/>
              <img className='img-fluid' src={preview?preview:"https://lirp.cdn-website.com/343f0986cb9d4bc5bc00d8a4a79b4156/dms3rep/multi/opt/1274512-placeholder-640w.png"} alt="" />
              </label>
            </div>
            <div className='col-lg-6'>
            <input type="text" className="form-control mt-3" placeholder='Project Title' value={projectDetails.title} onChange={e=>setProjectdetails({...projectDetails,title:e.target.value})}/>
               <input type="text" className="form-control mt-3" placeholder='Language Used' value={projectDetails.languages} onChange={e=>setProjectdetails({...projectDetails,languages:e.target.value})}/>
               <input type="text" className="form-control mt-3" placeholder='Github Link' value={projectDetails.github} onChange={e=>setProjectdetails({...projectDetails,github:e.target.value})}/>
               <input type="text" className="form-control mt-3" placeholder='Website Link' value={projectDetails.website} onChange={e=>setProjectdetails({...projectDetails,website:e.target.value})}/>
               <input type="text" className="form-control mt-3" placeholder='Project Overview' value={projectDetails.overview} onChange={e=>setProjectdetails({...projectDetails,overview:e.target.value})}/>
            </div>
               
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored'/>

    </>
  )
}

export default AddProject