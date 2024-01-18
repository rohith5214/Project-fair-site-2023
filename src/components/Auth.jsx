import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allApi';
import { authorizationContext } from '../Contexts/TokenAuth';
function Auth({register}) {
    const {isAuthorized,setIsAuthorized} = useContext(authorizationContext)
    const [userData,setUserData] = useState({
        username:"",email:"",password:""
    })
    const navigate = useNavigate()
    const isRgisterForm = register?true:false

    const handleRegister = async (e)=>{
        e.preventDefault()
        const {username,email,password} = userData
        if(!username ||!email ||!password){
            toast.info("Please fill the form completely!!!")
        }else{
            const result = await registerAPI(userData)
            if(result.status===200){
                toast.success(`${result.data.username} has registered successfuly!!!`)
                setUserData({
                    username:"",email:"",password:""
                })
                 navigate('/login')
            }else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }
    }

    const handleLogin = async (e)=>{
        e.preventDefault()
        const {email,password} = userData
        if(!email ||!password){
            toast.info("Please fill the form completely!!!")
        }else{
            const result = await loginAPI(userData)
            if(result.status===200){
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorized(true)
                setUserData({
                    email:"",password:""
                })
                 navigate('/')
            }else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }

    }
  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
      <div className='w-75 container'>
      <Link to={'/'} style={{textDecoration:'none',color:'blue'}}><i class="fa-solid fa-arrow-right fa-rotate-180 me-2"></i>Back To Home</Link>
      <div className='card bg-success p-5 shadow rounded'>
        <div className='row align-items-center'>
            <div className='col-lg-6'>
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png" alt="" className='rounded-start w-100'/>
            </div>
            <div className='col-lg-6'>
                <div className='d-flex align-items-center flex-column'>
                    <h1 className='fw-bolder mt-2  text-light'><i class="fa-solid fa-book-open"></i>Project Fair</h1>
                    <h5 className='fw-bolder mt-2 pb-3 text-light'>
                        {
                            isRgisterForm ? 'Sign up to your acoount':'Sign in to your account'
                        }
                    </h5>
                     <Form className='text-light w-100'>
                        {
                            isRgisterForm &&
                            <Form.Group className='mb-3' controlId='forBasicName'>
                                <Form.Control type='text' placeholder='Username' value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})}/>
                            </Form.Group>
                        }
                        <Form.Group className='mb-3' controlId='forBasicEmail'>
                                <Form.Control type='email' placeholder='Enter Email Id' value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}/>
                       </Form.Group>
                       <Form.Group className='mb-3' controlId='forBasicPswd'>
                                <Form.Control type='password' placeholder='password' value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}/>
                        </Form.Group>
                        {
                            isRgisterForm ?
                            <div>
                                <button onClick={handleRegister} className='btn btn-light'>Register</button>
                                <p>Already have an account? Click here to <Link to={'/login'}>Login</Link></p>
                            </div>:
                            <div>
                            <button onClick={handleLogin} className='btn btn-light'>Login</button>
                            <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                        </div>
                        }
                     </Form>
                </div>

            </div>

        </div>

      </div>
      </div>
      <ToastContainer theme='colored'/>
    </div>
  )
}

export default Auth