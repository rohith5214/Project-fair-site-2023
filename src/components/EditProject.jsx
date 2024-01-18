import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_url } from '../services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../services/allApi';
import EditContextshare, { editProjectResponseContext } from '../Contexts/EditContextshare';
function EditProject({project}) {
    const [show, setShow] = useState(false);
    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const handleClose = ()=> {
      setShow(false);
      setProjectdetails({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""

      })
      setpreview("")
    }
    const handleShow = ()=> setShow(true);

    const [projectDetails,setProjectdetails] = useState({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
      })
    const [preview,setpreview] = useState("")

    useEffect(()=>{
      if(projectDetails.projectImage){
        setpreview(URL.createObjectURL(projectDetails.projectImage))
      }
    },[projectDetails.projectImage])
     
    const handleUpdate = async ()=>{
      const {id,title,languages,github,website,overview,projectImage} = projectDetails
      if(!title ||!languages ||!overview ||!github ||!website){
        toast.info("Please fill the form Completely!!!")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
      const token = sessionStorage.getItem("token")
      if(preview){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`

        } 
        //api call
        const result = await editProjectAPI(id,reqBody,reqHeader)
        if(result.status===200){
          toast.success("Project Updated Successfully")
          handleClose()

          setEditProjectResponse(result.data)


        }else{
          console.log(result);
          toast.error(result.data.message)
        }
        }else{
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
         }
         const result = await editProjectAPI(id,reqBody,reqHeader)
        if(result.status===200){
          toast.success("Project Updated Successfully")
          handleClose();

          setEditProjectResponse(result.data)


        }else{
          console.log(result);
          toast.error(result.data.message)

        }
      }

    }
    }
  return (
    <>
    <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square fa-2x"></i></button>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className='col-lg-6'>
              <label>
              <input type="file" style={{display:'none'}} onChange={e=>setProjectdetails({...projectDetails,projectImage:e.target.files[0]})}/>
              <img className='img-fluid' src={preview?preview:`${base_url}/uploads/${project.projectImage}`} alt="" />
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
          <Button onClick={handleUpdate}  variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored'/>

   </>
  )
}

export default EditProject