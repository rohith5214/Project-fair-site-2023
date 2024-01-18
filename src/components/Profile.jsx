import React, { useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { base_url } from '../services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserAPI } from '../services/allApi';
function Profile() {
  const [open, setOpen] = useState(false);
  const [userProfile,setUserProfile] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profile:""
  })
  const [existingImage,setExistingImage] = useState("")
  const [preview,setPreview] = useState("")
  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:""})
    setExistingImage(user.profile)
  },[])
  useEffect(()=>{
    if(userProfile.profile){
      setPreview(URL.createObjectURL(userProfile.profile))
    }else{
      setPreview("")
    }
  },[userProfile.profile])

  const handleUserUpdate = async()=>{
    const {username,email,password,github,linkedin,profile} = userProfile
    if(!github ||!linkedin){
        toast.warning("Please fill the form completely...!")
    }else{
       const reqBody = new FormData()
       reqBody.append("username",username)
       reqBody.append("email",email)
       reqBody.append("password",password)
       reqBody.append("github",github)
       reqBody.append("linkedin",linkedin)
       preview?reqBody.append("profileImage",profile):reqBody.append("profileImage",existingImage)
       const token = sessionStorage.getItem("token")
       if(preview){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
           "Authorization":`Bearer ${token}`
        }
        const result = await updateUserAPI(reqBody,reqHeader)
        if(result.status===200){
          toast.success("Profile updated successfuly...!")
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }else{
          console.log(result);
          toast.error(result.response.data)
        }
       }else{
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
       }
       
    }
  }
  return (
    <div className='card shadow p-5 mt-3 mb-3'>
       <div className='d-flex justify-content-between'>
           <h2>My Profile</h2>
           <button onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open} className='btn btn-outline-info'><i class="fa-solid fa-angle-up fa-rotate-180"></i></button>
       </div>
       <Collapse in={open}>
        <div id="example-collapse-text">
        <div className='row justify-content-center mt-3'>
          <label className='text-center'>
            <input type="file" style={{display:'none'}} onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})}/>
            {
              existingImage!==""?
              <img src={preview?preview:`${base_url}/uploads/${existingImage}`} width={'200px'} height={'200px'} alt="" />:
              <img src={preview?preview:"https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"}width={'200px'} height={'200px'} alt="" />
            }
            <div className='mt-3'>
                <input type="text" className='form-control' placeholder='GitHub' value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})}/>
            </div>
            <div className='mt-3'>
                <input type="text" className='form-control' placeholder='LinkedIn' value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})}/>
            </div>
            <div>
              <button onClick={handleUserUpdate} className='mt-3 btn btn-warning w-100'>Update</button>
            </div>
          </label>

       </div>
        </div>
      </Collapse>
      <ToastContainer autoClose={2000} theme='colored'/>

    </div>

  )
}

export default Profile

