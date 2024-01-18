import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import projectpic from '../assets/netflix.png'
import { base_url } from '../services/baseurl';
function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
      <Card onClick={handleShow} className='mb-5 shadow btn'>
      <Card.Img variant="top" src={project?`${base_url}/uploads/${project.projectImage}`:projectpic} />
      <Card.Body>
        <Card.Title className='text-danger'>{project.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Projects Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                    <img style={{height:'200px'}} className='imb-fluid' src={project?`${base_url}/uploads/${project.projectImage}`:projectpic} alt="" />
                </Col>
                <Col md={6}>
                    <h2 className='text-success'>{project.title}</h2>
                    <p>Project Overview: <span className='text-danger'>{project.overview}</span></p>
                    <p>Language Used: <span className='fw-bolder text-danger'>{project.languages}</span></p>

                </Col>
            </Row>
            <div className='mt-3'> 
                <button className='btn'><a href={project.github} target='_blank'><i className="fa-brands fa-github fs-3 me-3 text-dark"></i></a></button>
                <button className='btn'><a href={project.website} target='_blank'><i className="fa-solid fa-link fs-3 text-dark"></i></a></button>

            </div>
        </Modal.Body>
        </Modal>
    </>
  )
}

export default ProjectCard