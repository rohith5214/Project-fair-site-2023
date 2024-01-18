import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{width:"100%",height:"300px"}} className='d-flex flex-column justify-content-center align-items-center bg-success '>
        <div className="footer-div d-flex justify-content-evenly w-100 flex-wrap">
           <div className="website" style={{width:"400px"}}>
            <h4 className='mb-3' style={{color:'white'}}><i class="fa-solid fa-book-open"></i>Project Fair</h4>
            <h6 className='text-light'>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</h6>
            <h6 className='text-light'>Code licensed MIT, docs CC BY 3.0.</h6>
            <p className='text-light'>Currently v5.3.2.</p>
           </div>
           <div className="links d-flex flex-column">
            <h4 className='mb-3' style={{color:'white'}}>Links</h4>
            <Link to={'/'} style={{textDecoration:"none",color:"white"}}>Home</Link>
            <Link to={'/login'} style={{textDecoration:"none",color:"white"}}>Login</Link>
            <Link to={'/Register'} style={{textDecoration:"none",color:"white"}}>Register</Link>
           </div>
           <div className="guides d-flex flex-column">
           <h4 className='mb-3' style={{color:'white'}}>Guides</h4>
            <Link to={'https://getbootstrap.com/'} style={{textDecoration:"none",color:"white"}}>React</Link>
            <Link to={'https://getbootstrap.com/'} style={{textDecoration:"none",color:"white"}}>Bootstrap</Link>
            <Link to={'https://getbootstrap.com/'} style={{textDecoration:"none",color:"white"}}>Routing</Link>
           </div>
           <div className="contacts">
            <h4 className='mb-3' style={{color:'white'}}>Contact Us</h4>
            <div className="sub d-flex mt-3">
              <input type="text" className='form-contol rounded' placeholder='Enter Your Email id'/>
              <button className='btn btn-primary ms-3'>Subscribe</button>
            </div>
            <div className="icons fs-4 d-flex justify-content-between mt-3">
            <Link to={'https://getbootstrap.com/'} style={{textDecoration:"none",color:"white"}}><i className="fa-solid fa-envelope"></i></Link>
            <Link to={'https://getbootstrap.com/'} style={{textDecoration:"none",color:"white"}}><i className="fa-brands fa-twitter"></i></Link>
            <Link to={'https://getbootstrap.com/'} style={{textDecoration:"none",color:"white"}}><i className="fa-brands fa-linkedin"></i></Link>
            <Link to={'https://getbootstrap.com/'} style={{textDecoration:"none",color:"white"}}><i className="fa-brands fa-instagram"></i></Link>
            <Link to={'https://getbootstrap.com/'} style={{textDecoration:"none",color:"white"}}><i class="fa-brands fa-github"></i></Link>
            <Link to={'https://getbootstrap.com/'} style={{textDecoration:"none",color:"white"}}><i class="fa-brands fa-facebook"></i></Link>
            </div>
           </div>
        </div>
        <p style={{color:'white'}}>Copyright © 2023 Project Fair. Built with React.</p>
    </div>
  )
}

export default Footer