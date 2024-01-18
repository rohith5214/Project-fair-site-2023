import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Header({insideDashboard}) {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    alert("Are You Sure You Want To Logout?")
     sessionStorage.removeItem("existingUser")
     sessionStorage.removeItem("token")
     navigate('/')
  }
  return (
    <>
      <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Brand className='text-light fw-bolder fs-3'><Link to={'/'} style={{textDecoration:'none',color:'white'}}><i class="fa-solid fa-book-open"></i>Project Fair</Link></Navbar.Brand>
        {
          insideDashboard && 
          <button onClick={handleLogout} className='btn ms-auto text-danger'>Logout<i class="fa-solid fa-right-from-bracket mt-1"></i></button>

        }
        </Container>
    </Navbar>
    </>
  )
}

export default Header