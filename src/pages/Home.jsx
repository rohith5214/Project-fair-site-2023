import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allApi'
function Home() {
  const [loggedin,setloggedin] = useState(false)
  const [homeProjects,setHomeProjects] = useState([])

  const getHomeprojects = async ()=>{
    const result = await homeProjectAPI()
    if(result.status===200){
      setHomeProjects(result.data)
    }else{
      console.log(result);
      console.log(result.response.data);
    }
  }
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setloggedin(true)
    }else{
      setloggedin(false)
    }
    //api call
    getHomeprojects()
  },[])
  return (
    <>
    <div style={{width:'100%',height:'100vh',backgroundColor:'#90ee90'}} className='container-fluid rounded '>
      <Row className='align-items-center p-5 mt-5'>
        <Col sm={12} md={6}>
          <h1 style={{fontSize:'80px'}} className=' text-light'><i class="fa-solid fa-book-open"></i>Project Fair</h1>
          <p>One Top Destination for all software Development Projects. Where user can add and manage their projects. As well as access all projects avilable in our site...what are u waiting for!!!</p>
          {
            loggedin?
            <Link to={'/dashboard'}><button className='btn btn-warning'>Manage Your Projects<i className="fa-solid fa-arrow-right ms-2"></i></button></Link>:
            <Link to={'/login'}><button className='btn btn-warning'>Start To Explore<i className="fa-solid fa-arrow-right ms-2"></i></button></Link>

          }

        </Col>
        <Col sm={12} md={6}>
          <img style={{marginTop:'90px',marginLeft:'50px'}} className='w-75' src="https://cdni.iconscout.com/illustration/premium/thumb/developer-2143200-1801815.png" alt="" />
        </Col>
      </Row>
    </div>
    <div className='all-projects mt-4'>
      <h1 className='text-center'>Explore Our Projects</h1>
      <marquee scrollAmount={25}>
      <Row>
        {
          homeProjects?.length>0?homeProjects.map(project=>(
            <Col sm={12} md={6} lg={4}>
              <ProjectCard project={project}/>
            </Col>
          )):null
        }
        
      </Row>
      </marquee>
      <div className='text-center mt-5 mb-3' ><Link to={'/project'} style={{textDecoration:'none',color:'blue'}}>View More Projects</Link></div>
    </div>
    </>
  )
}

export default Home